const { DataTypes,Sequelize } = require("sequelize");
const sequelize = require("./sequelize");


// performance model
const Performance = sequelize.define('Performance', {
  id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  item_id: { type: DataTypes.INTEGER, allowNull: true },
  kind: { type: DataTypes.STRING(50), allowNull: true },
  item_sns_id: { type: DataTypes.INTEGER, allowNull: true },
  sns_id: { type: DataTypes.STRING(50), allowNull: true },
  sns_symbol: { type: DataTypes.STRING(20), allowNull: true },
  raw_value: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  score: { type: DataTypes.INTEGER, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
  createdat: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
  updatedat: { type: DataTypes.DATE, allowNull: true },
  update_ts: { type: DataTypes.BIGINT, allowNull: true },
}, {
  tableName: 'performance',
  timestamps: false
});

module.exports = Performance;