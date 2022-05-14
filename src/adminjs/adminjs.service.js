const AdminJsService = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const config = require('../config');
const databaseService = require('./../database/database.service');
const utilsService = require('../utils/utils.service');
const User = require('../database/models/user.model');
const Currency = require('../database/models/currency.model');
const Wallet = require('../database/models/wallet.model');
const Snapshot = require('../database/models/snapshot.model');
const TransactionCategory = require('../database/models/transaction-category.model');
const TransactionType = require('../database/models/transaction-type.model');
const Transaction = require('../database/models/transaction.model');

AdminJsService.registerAdapter(AdminJSSequelize);

const service = new AdminJsService({
  databases: [databaseService.getContext()],
  rootPath: '/admin',
  branding: {
    companyName: 'fintracker-admin',
  },
  resources: [User, Currency, Wallet, Snapshot, TransactionCategory, TransactionType, Transaction],
});

service.insertInitialData = async () => {
  const adminEmail = config.ADMIN_JS_EMAIL;
  const adminPassword = await utilsService.scryptHash(config.ADMIN_JS_PASSWORD);

  const [admin] = await User.findAll({
    where: {email: adminEmail},
  });
  if (!admin) {
    User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'ADMIN',
    });
  }
};

module.exports = service;
