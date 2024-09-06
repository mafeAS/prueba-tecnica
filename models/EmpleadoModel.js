import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const EmpleadoModel = db.define('Empleados', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    boletin: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'empleados',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

export default EmpleadoModel;
