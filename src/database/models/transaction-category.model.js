const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');
const Snapshot = require('../models/snapshot.model');

class TransactionCategory extends Model {}

const model = TransactionCategory.init({
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
  snapshot_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'transaction_categories',
  timestamps: false,
});

model.belongsTo(Snapshot, {foreignKey: 'snapshot_id', onDelete: 'cascade'});

model.sync({alter: true});

module.exports = model;
