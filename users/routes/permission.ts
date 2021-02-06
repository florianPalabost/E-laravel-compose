import express from 'express';
const router = express.Router();
const PermissionsController = require('../src/controllers/PermissionsController');

router.get('/', (req, res) => PermissionsController.getPermissions(req, res));

router.post('/', (req, res) => PermissionsController.create(req, res));

router.put('/', (req, res, next) => PermissionsController.update(req, res));

router.delete('/:id', (req, res, next) => PermissionsController.remove(req, res));

module.exports = router;