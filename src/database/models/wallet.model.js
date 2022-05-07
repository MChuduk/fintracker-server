const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');
const Snapshot = require('../models/snapshot.model');
const Currency = require('../models/currency.model');

class Wallet extends Model {}

const model = Wallet.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  row_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  name: {
    type: DataTypes.STRING, allowNull: false,
  },
  currency_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  snapshot_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'wallets',
  timestamps: false,
});

model.belongsTo(Snapshot, {foreignKey: 'snapshot_id'});
model.belongsTo(Currency, {foreignKey: 'currency_id'});

model.sync({alter: true});

module.exports = model;
