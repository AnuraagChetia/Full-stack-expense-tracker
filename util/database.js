const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenseTracker", "root", "root123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
