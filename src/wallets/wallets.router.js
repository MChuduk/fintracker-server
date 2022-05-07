const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const walletsController = require('./wallets.controller');

router.get('/wallets', utilsService.dispatchErrors(walletsController.getAll));
router.post('/wallets', utilsService.dispatchErrors(walletsController.create));

module.exports = router;
