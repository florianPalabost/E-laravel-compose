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
  console.log(records);
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
    // TODO
}

const remove = async (req: Request, res: Response) => {
   const deleted = await RoleService.remove(req.body.name);
   res.status(200).json(deleted);
}



module.exports = {
    getRoles,
    create,
    update,
    remove
}