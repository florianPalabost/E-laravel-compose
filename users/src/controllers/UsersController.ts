import {Request, Response} from "express";
const UserService = require('../services/userService');

const getUsers = async (req, res) => {
    res.status(200).json(await UserService.getUsers());
}

const login = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // 401 -> unauthorized status
        if (!username || !password) return res.status(401).send();

        const {user, accessToken, refreshToken} = await UserService.login(username, password);
        res.status(200).send({user, accessToken, refreshToken});
    } catch (e) {
        console.log('[ERROR USER CONTROLLER] : ', e);
        res.status(500).send(e);
    }
}

const register = async (req: Request, res: Response) => {
    const records = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    };
    try {
        const accessToken = await UserService.register(records);
        res.status(201).json(accessToken);
    } catch (e) {
        res.status(500).json(e);
    }

}

module.exports = {
    login,
    register,
    getUsers
}