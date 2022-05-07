const AdminJsService = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const databaseService = require('./../database/database.service');
const User = require('../database/models/user.model');
const Currency = require('../database/models/currency.model');
const Wallet = require('../database/models/wallet.model');
const Snapshot = require('../database/models/snapshot.model');
const TransactionCategory = require('../database/models/transaction-category.model');
const TransactionType = require('../database/models/transaction-type.model');
const Transaction = require('../database/models/transaction.model');

AdminJsService.registerAdapter(AdminJSSequelize);

module.exports = new AdminJsService({
  databases: [databaseService.getContext()],
  rootPath: '/admin',
  branding: {
    companyName: 'fintracker-admin',
  },
  resources: [User, Currency, Wallet, Snapshot, TransactionCategory, TransactionType, Transaction],
});
