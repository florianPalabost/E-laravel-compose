import {Request, Response} from "express";
const RoleService = require('../services/roleService');
const models = require('../models');

const getRoles = async (req, res) => {
    res.status(200).json(await RoleService.getRoles());
}

const create = async (req: Request, res: Response) => {
  const records = {
      name: req.body.name,
      permissions: req.body.permissions
  };
  try {
      const role = await RoleService.create(records);
      res.status(201).json(role);
  }
  catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
};

const update = async (req: Request, res: Response) => {
    const role = {...req.body};
    try {
        const isUpdated = RoleService.update(role);
        res.json(isUpdated);
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const deleted = await RoleService.remove(req.body.name);
        res.status(200).json(deleted);
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}



module.exports = {
    getRoles,
    create,
    update,
    remove
}