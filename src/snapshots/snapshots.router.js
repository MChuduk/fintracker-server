const express = require('express');
const utilsService = require('./../utils/utils.service');
const router = express.Router();

const snapshotsController = require('./snapshots.controller');

router.get('/snapshots', utilsService.dispatchErrors(snapshotsController.getAll));
router.get('/snapshots/:id', utilsService.dispatchErrors(snapshotsController.getOne));
router.post('/snapshots', utilsService.dispatchErrors(snapshotsController.create));
router.delete('/snapshots/:id', utilsService.dispatchErrors(snapshotsController.delete));

module.exports = router;
