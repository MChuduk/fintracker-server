const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');
const Snapshot = require('../models/snapshot.model');
const TransactionTypes = require('../models/transaction-type.model');

class Transaction extends Model {}

const model = Transaction.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  row_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  type_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  note: {
    type: DataTypes.STRING, allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT, allowNull: false,
  },
  date: {
    type: DataTypes.STRING, allowNull: false,
  },
  wallet_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  repeat: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  snapshot_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'transactions',
  timestamps: false,
});

model.belongsTo(TransactionTypes, {foreignKey: 'type_id'});
model.belongsTo(Snapshot, {foreignKey: 'snapshot_id'});

model.sync({alter: true});

module.exports = model;
