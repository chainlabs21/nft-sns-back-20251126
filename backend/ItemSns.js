const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const ItemSns = sequelize.define(
  "ItemSns",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    platform_assigned_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    handle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    sns_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sns_kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    url: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },

    uuid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // ⭐ Added fields (your request)
    pre_exposure_start_ts: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    main_exposure_start_ts: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    createdat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },

    status_str: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "item_sns",
    timestamps: false,
  }
);

module.exports = ItemSns;
