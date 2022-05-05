const AdminJsService = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const databaseService = require('./../database/database.service');
const User = require('../database/models/user.model');
const Currency = require('../database/models/currency.model');
const Snapshot = require('../database/models/snapshot.model');

AdminJsService.registerAdapter(AdminJSSequelize);

module.exports = new AdminJsService({
  databases: [databaseService.getContext()],
  rootPath: '/admin',
  branding: {
    companyName: 'fintracker-admin',
  },
  resources: [User, Currency, Snapshot],
});
