const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const snapshotsController = require('./snapshots.controller');

router.post('/snapshots', utilsService.dispatchErrors(snapshotsController.create));

module.exports = router;
