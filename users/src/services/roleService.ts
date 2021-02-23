import {DataTypes} from "sequelize";
const models = require('../models');
const PermissionService = require('../services/permissionService');

const getRoles = async () => {
    return await models.Role.findAll({include: [
        {
            model: models.Permission,
            as: 'permissions',
            through: { attributes: ['is_allowed'] }
        },
        {
            model: models.User,
            as: 'users'
        },
        ]
    });
}

const retrieveRole = async (name: string) => {
    if (name === "" || name === null || name === undefined) return null;
    try {
        return await models.Role.findOne({where: {name}});
    } catch (e) {
        return e;
    }
};


const create = async (records) => {
    try {
        await models.Role.create(records);
        const role = await retrieveRole(records.name);
        const permissionToSet = [];
        for (let i=0; i<records.permissions.length; i++ ) {
            const perm = await PermissionService.retrievePermission(records.permissions[i].name);
            perm.is_allowed = true;
            permissionToSet.push(perm);
        }

        await role.setDataValue('permissions', permissionToSet);
        await role.setPermissions(permissionToSet, {through: {is_allowed: true}});
        await role.save();
        return role;
    } catch (e) {
        return e;
    }
}

const remove = async (name) => {
    try {
        return await models.Role.destroy({where: {name}});
    }
    catch (e) {
        console.log(e);
        return e;
    }

}

const update = async (role) => {
    try {
        const roleDb = await retrieveRole(role.name);
        // need to re-find permission in db to be able to set them to role ...
        const permissionToSet = [];
        for (let i=0; i<role.permissions.length; i++ ) {
            const perm = await PermissionService.retrievePermission(role.permissions[i].name);
            perm.is_allowed = true;
            permissionToSet.push(perm);
        }
        const tata = await roleDb.setPermissions(permissionToSet, {through: {is_allowed: true}})
        await roleDb.save();
        return roleDb;
    }
    catch (e) {
        console.log(e);
        return e;
    }

}
module.exports = {
    getRoles,
    retrieveRole,
    create,
    remove,
    update
}