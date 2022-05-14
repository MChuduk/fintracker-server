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
  resources: [{
    resource: User,
    options: {
      properties: {
        id: {position: 1},
        email: {position: 2},
      },
    },
  },
  {
    resource: Currency,
    options: {
      properties: {
        id: {position: 1},
        name: {position: 2},
        exchange_rate: {position: 3},
      },
    },
  },
  {
    resource: Wallet,
    options: {
      properties: {
        id: {position: 1},
        row_id: {position: 2},
        name: {position: 3},
        currency_id: {position: 4},
        snapshot_id: {position: 5},
      },
    },
  },
  {
    resource: Snapshot,
    options: {
      properties: {
        id: {position: 1},
        user_id: {position: 2},
        created_at: {position: 3},
      },
    },
  }, {
    resource: TransactionCategory,
    options: {
      properties: {
        id: {position: 1},
        row_id: {position: 2},
        name: {position: 3},
        snapshot_id: {position: 4},
      },
    },
  },
  {
    resource: TransactionType,
    options: {
      properties: {
        id: {position: 1},
        name: {position: 2},
      },
    },
  },
  {
    resource: Transaction,
    options: {
      properties: {
        id: {position: 1},
        row_id: {position: 2},
        wallet_id: {position: 3},
        category_id: {position: 4},
        note: {position: 5},
        amount: {position: 6},
        date: {position: 7},
        snapshot_id: {position: 8},
      },
    },
  }],
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
