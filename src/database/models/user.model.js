const {DataTypes, Model} = require('sequelize');
const dbService = require('../database.service');

class User extends Model {}

const model = User.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING, unique: true, allowNull: false,
  },
  password: {
    type: DataTypes.STRING, allowNull: false,
  },
}, {
  sequelize: dbService.getContext(),
  tableName: 'users',
  timestamps: false,
});

model.sync();

module.exports = model;
