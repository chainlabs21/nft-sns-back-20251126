const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./sequelize");

// sns_key model
const SnsKey = sequelize.define('SnsKey', {
  id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  createdat: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
  updatedat: { type: DataTypes.DATE, allowNull: true },
  sns_id: { type: DataTypes.INTEGER, allowNull: true },
  api_key: { type: DataTypes.STRING(255), allowNull: false },
  api_secret: { type: DataTypes.STRING(255), allowNull: false },
  access_token: { type: DataTypes.STRING(255), allowNull: true },
  action: { type: DataTypes.STRING(100), allowNull: true },
  status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
  status_message: { type: DataTypes.STRING(255), allowNull: true },
  count_use_cumul: { type: DataTypes.BIGINT, allowNull: true, defaultValue: 0 },
  count_use_span: { type: DataTypes.BIGINT, allowNull: true, defaultValue: 0 },
}, {
  tableName: 'sns_key',
  timestamps: false
});

module.exports = SnsKey;