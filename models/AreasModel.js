import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AreasModel = db.define(
    "areas",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
    },
    {
      freezeTableName: true, 
      tableName: "areas", 
    }
  );
  
  export default AreasModel;