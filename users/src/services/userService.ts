import {DataTypes} from "sequelize";

const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt');

// hash() wants a number -> parsing
const saltRounds = Number.parseInt(process.env.SALT_ROUNDS) || 13;

const getUsers = async () => {
    return await models.User.findAll();
}

const retrieveUserByEmail = async (email: string) => {
    if (email === "" || email === null || email === undefined) return null;
    try {
        return await models.User.findOne({where: {email}});
    } catch (e) {
        return e;
    }
};
const checkPassword = async (password: string, passwordRecorded: string) => {
    if (password === "" || password === null || password === undefined) return null;

    return await bcrypt.compare(password, passwordRecorded);
};

const login = async (email: string, password: string) => {

    try {
        // retrieve user then check password
        const user = await retrieveUserByEmail(email);

        if (user === null) return {};

        const isPwdCorrect = await checkPassword(password, user.password);

        // todo generate password error to return
        if (!isPwdCorrect) return 'not found';

        const payload = {email};

        // generate tokens & use setDataValue() for custom props
        user.setDataValue('accessToken', generateToken(payload));
        user.setDataValue('refreshToken', generateToken(payload, true));

        return user;
    } catch (e) {
        return e;
    }
};

const register = async (records) => {
    try {
        records.password = await bcrypt.hash(records.password, saltRounds);
        const user =  await models.User.create(records, {
            include: [ models.Role ]
        });
        user.accessToken = generateToken({user});
        return user;
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

const update = async (user) => {
    try {
        const [numberOfAffectedRows, affectedRows] = await models.User.update(user,
            {
                returning: true,
                where: {id:user.id},
                plain: true
            });
        return affectedRows;
    }
    catch (e) {
        console.log(e);
        return e;
    }

}

const remove = async (userId) => {
  try {
      return await models.User.destroy({
          where: {
              id: userId
          }
      });
  }
  catch (e) {
      return e;
  }
};

module.exports = {
    getUsers,
    retrieveUserByEmail,
    checkPassword,
    login,
    register,
    generateToken,
    update,
    remove
}