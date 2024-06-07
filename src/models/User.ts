import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import userInterface from "../interfaces/User.interface";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  { hooks: {}, paranoid: true, timestamps: true, tableName: "users" }
);

export default User;
