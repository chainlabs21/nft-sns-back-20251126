const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Setting = sequelize.define(
  "Setting",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    setting_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "setting_key",
    },
    setting_value: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "setting_value",
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "description",
    },
  },
  {
    tableName: "setting",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Setting;
