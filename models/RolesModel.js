import db from "../database/db.js";
import { DataTypes } from "sequelize";

const RolesModel = db.define(
    "roles",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
    },
    {
      freezeTableName: true, 
      tableName: "roles", 
    }
  );
  
  export default RolesModel;