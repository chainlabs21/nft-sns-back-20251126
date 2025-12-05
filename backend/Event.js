const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Event = sequelize.define("event", {
  id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  kind: { type: DataTypes.STRING(50) },
  event_date: { type: DataTypes.DATEONLY },
  status: { type: DataTypes.TINYINT, defaultValue: 0 },
  status_message: { type: DataTypes.STRING(255) },
  join_start: { type: DataTypes.DATEONLY },
  join_end: { type: DataTypes.DATEONLY },
  exposure_pre_start: { type: DataTypes.DATEONLY },
  exposure_pre_end: { type: DataTypes.DATEONLY },
  exposure_main_start: { type: DataTypes.DATEONLY },
  exposure_main_end: { type: DataTypes.DATEONLY },
  url_image_big: { type: DataTypes.STRING(500) },
  url_thumbnail: { type: DataTypes.STRING(500) },
}, {
  timestamps: false,
  tableName: "event"
});

module.exports = Event;
