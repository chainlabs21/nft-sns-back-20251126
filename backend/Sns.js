const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Sns = sequelize.define(
  "Sns",
  {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    description: DataTypes.TEXT,
    website_url: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    platform: DataTypes.STRING,
    handle: DataTypes.STRING,
    status: DataTypes.INTEGER,
  },
  {
    tableName: "sns",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Sns;
