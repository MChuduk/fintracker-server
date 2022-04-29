const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const currencyController = require('./currency.controller');

router.get('/currency', utilsService.dispatchErrors(currencyController.getAll));

module.exports = router;
