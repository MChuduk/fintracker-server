const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/users', utilsService.dispatchErrors(authController.signUpUser));
router.get('/users', utilsService.dispatchErrors(authController.signInUser));

module.exports = router;
