const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Item = sequelize.define(
  "item",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING(100), allowNull: false },
    url_storage: { type: DataTypes.STRING(512) },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    event_id: { type: DataTypes.INTEGER },
    status_message: { type: DataTypes.STRING(255) },
    url_thumbnail: { type: DataTypes.STRING(300) },

    category: { type: DataTypes.STRING(100) },
    tags: { type: DataTypes.STRING(255) },
    royalty: { type: DataTypes.INTEGER },
  },
  {
    tableName: "item",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Item;
