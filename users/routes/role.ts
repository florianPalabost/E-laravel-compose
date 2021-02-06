import express from 'express';
const router = express.Router();
const RolesController = require('../src/controllers/RolesController');

router.get('/', (req, res) => RolesController.getRoles(req, res));

router.post('/', (req, res) => RolesController.create(req, res));

router.put('/', (req, res, next) => RolesController.update(req, res));

router.delete('/', (req, res, next) => RolesController.remove(req, res));

module.exports = router;