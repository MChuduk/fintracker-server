const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');

class TransactionType extends Model {}

const model = TransactionType.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, unique: true, allowNull: false,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'transaction_types',
  timestamps: false,
});

model.sync({alter: true});

module.exports = model;
