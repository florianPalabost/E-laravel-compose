import express from 'express';
const router = express.Router();
const UsersController = require('../src/controllers/UsersController');


router.post('/login', (req, res) => UsersController.login(req, res));

router.post('/register', (req, res, next) => UsersController.register(req, res));

router.put('/:id', (req, res, next) => UsersController.update(req, res));

router.get('/', (req, res) => UsersController.getUsers(req, res));

module.exports = router;