import {Request, Response} from "express";
const UserService = require('../services/userService');

const getUsers = async (req, res) => {
    res.status(200).json(await UserService.getUsers());
}


const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // 401 -> unauthorized status
        if (!email || !password) return res.status(401).send();

        const user = await UserService.login(email, password);
        if (user !== null && Object.keys(user).length > 0) {
            res.status(200).send({user});
        }
        else {
            res.status(401).send({message: 'No user with these credentials'});
        }
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
        rolename: req.body.role || 'USER'
    };
    try {
        const user = await UserService.register(records);
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json(e);
    }

}

const update = async (req: Request, res: Response) => {
    const user = {...req.body};
    try {
        const isUpdated = await UserService.update(user);
        res.json(isUpdated);
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

const remove = async (req: Request, res: Response ) => {
  const userId = req.params.id;

  try {
      const isDeleted = await UserService.remove(userId);
      res.json(isDeleted);
  }
  catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
};

module.exports = {
    login,
    register,
    getUsers,
    update,
    remove
}