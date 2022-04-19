const AdminJsService = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const databaseService = require('./../database/database.service');
const User = require('../database/models/user.model');

AdminJsService.registerAdapter(AdminJSSequelize);

module.exports = new AdminJsService({
  databases: [databaseService.getContext()],
  rootPath: '/admin',
  branding: {
    companyName: 'fintracker-admin',
  },
  resources: [{
    resource: User,
    options: {
      properties: {
        id: {position: 1},
        email: {position: 2},
        password: {position: 3},
      },
    },
  }],
});
