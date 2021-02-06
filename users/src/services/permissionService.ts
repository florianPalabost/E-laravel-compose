import {DataTypes} from "sequelize";

const models = require('../models');

const getPermissions = async () => {
    return await models.Permission.findAll();
}

const retrievePermission = async (name: string) => {
    if (name === "" || name === null || name === undefined) return null;
    try {
        return await models.Permission.findOne({where: {name}});
    } catch (e) {
        return e;
    }
};


const create = async (records) => {
    try {
        return await models.Permission.create(records);
    } catch (e) {
        return e;
    }
}

module.exports = {
    getPermissions,
    retrievePermission,
    create,
}