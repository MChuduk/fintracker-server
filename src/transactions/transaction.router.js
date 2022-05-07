const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const transactionsController = require('./transaction.controller');

router.get('/transactions', utilsService.dispatchErrors(transactionsController.getAll));
router.post('/transactions', utilsService.dispatchErrors(transactionsController.create));

module.exports = router;
