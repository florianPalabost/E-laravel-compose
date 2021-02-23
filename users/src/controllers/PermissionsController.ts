import {Request, Response} from "express";
const PermissionService = require('../services/permissionService');

const getPermissions = async (req, res) => {
    res.status(200).json(await PermissionService.getPermissions());
}

const create = async (req: Request, res: Response) => {
  const records = {
      name: req.body.name,
      description: req.body.description,
  };
  try {
      const permission = await PermissionService.create(records);
      res.status(201).json(permission);
  }
  catch (e) {
      res.status(500).json(e);
  }
};

const update = async (req: Request, res: Response) => {
    // TODO
}

const remove = async (req: Request, res: Response) => {
    // TODO
}



module.exports = {
    getPermissions,
    create,
    update,
    remove
}