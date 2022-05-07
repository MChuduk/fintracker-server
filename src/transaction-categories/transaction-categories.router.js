const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const transactionCategoriesController = require('./transaction-categories.controller');

router.get('/transaction/categories', utilsService.dispatchErrors(transactionCategoriesController.getAll));
router.post('/transaction/categories', utilsService.dispatchErrors(transactionCategoriesController.create));

module.exports = router;
