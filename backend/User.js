const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define("User", {
  full_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "User" },
  bio: { type: DataTypes.TEXT },
  twitter: { type: DataTypes.STRING },
  instagram: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
