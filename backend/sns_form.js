// models/SnsForm.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const SnsForm = sequelize.define(
  "sns_form",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    sns_kind: { type: DataTypes.STRING, allowNull: false },
    field_name: { type: DataTypes.STRING, allowNull: false },
    field_type: { type: DataTypes.STRING, allowNull: false }, // string, file, array
    required: { type: DataTypes.BOOLEAN, defaultValue: false },
    max_length: { type: DataTypes.INTEGER },
    allowed_types: { type: DataTypes.STRING }, // e.g., "jpg,png,mp4"
    createdat: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedat: { type: DataTypes.DATE }
  },
  {
    tableName: "sns_form",
    timestamps: false,
  }
);

module.exports = SnsForm;
