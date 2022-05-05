const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');
const User = require('../models/user.model');

class Snapshot extends Model {}

const model = Snapshot.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER, allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE, allowNull: false, defaultValue: new Date(),
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'snapshots',
  createdAt: 'created_at',
  updatedAt: false,
});

model.belongsTo(User, {foreignKey: 'user_id'});

model.sync({alter: true});

module.exports = model;
