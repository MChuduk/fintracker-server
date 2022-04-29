const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/signUp', utilsService.dispatchErrors(authController.signUpUser));
router.post('/signIn', utilsService.dispatchErrors(authController.signInUser));

module.exports = router;
