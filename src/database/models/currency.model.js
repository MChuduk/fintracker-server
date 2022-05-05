const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');

class Currency extends Model {}

const model = Currency.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, unique: true, allowNull: false,
  },
  exchange_rate: {
    type: DataTypes.FLOAT, allowNull: false, defaultValue: 0,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'currency',
  timestamps: false,
});

model.sync({alter: true});

module.exports = model;
