import {DataTypes, Error} from "sequelize";

const jwt = require('jsonwebtoken');
const db = require('../../db');
const User = require('../models/user.model')(db.sequelize, DataTypes);
const bcrypt = require('bcrypt');

// hash() wants a number -> parsing
const saltRounds = Number.parseInt(process.env.SALT_ROUNDS) || 13;

const getUsers = async () => {
    return await User.findAll();
}

const retrieveUserByUsername = async (username: string) => {
    if (username === "" || username === null || username === undefined) return null;
    try {
        return await User.findOne({where: {username}});
    } catch (e) {
        return e;
    }
};
const checkPassword = async (password: string, passwordRecorded: string) => {
    if (password === "" || password === null || password === undefined) return null;

    return await bcrypt.compare(password, passwordRecorded);
};

const login = async (username: string, password: string) => {

    try {
        // retrieve user then check password
        const user = await retrieveUserByUsername(username);
        const isPwdCorrect = await checkPassword(password, user.password);

        // todo generate password error to return
        if (!isPwdCorrect) return 'not found';

        const payload = {username};

        // generate tokens
        const accessToken = generateToken(payload);
        const refreshToken = generateToken(payload, true);

        return {user, accessToken, refreshToken};
    } catch (e) {
        return e;
    }
};

const register = async (records) => {
    try {
        records.password = await bcrypt.hash(records.password, saltRounds);
        const user =  await User.create(records);
        const accessToken = generateToken({user});
        return {accessToken};
    } catch (e) {
        return e;
    }
}

const generateToken = (payload, isRefreshToken = false) => {
    return jwt.sign(payload, isRefreshToken ? process.env.REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: isRefreshToken ? process.env.REFRESH_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE
    });
};

module.exports = {
    getUsers,
    retrieveUserByUsername,
    checkPassword,
    login,
    register,
    generateToken
}