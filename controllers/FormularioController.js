import AreasModel from "../models/AreasModel.js";
import RolesModel from "../models/RolesModel.js";
import EmpleadoModel from '../models/EmpleadoModel.js';
import sequelize from '../database/db.js';




export const getAllAreas=async(req,res)=>{
    try{
        const areas=await AreasModel.findAll()
        res.json(areas)
    }catch(error){
        res.json({message:error.message})
    }
}

export const getAllRoles=async(req,res)=>{
    try {
        const roles=await RolesModel.findAll()
        res.json(roles)
    } catch (error) {
        res.json({message:error.message})
    }
}




export const getAllEmpleados = async (req, res) => {
    try {
        const query = `
            SELECT
                empleados.nombre,
                empleados.email,
                empleados.sexo,
                areas.nombre AS area,
                empleados.area_id,
                empleados.boletin,
                empleados.descripcion
            FROM empleados
            INNER JOIN areas ON empleados.area_id = areas.id
        `;

        const [results, metadata] = await sequelize.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: error.message });
    }
};


export const guardarEmpleado = async (req, res) => {
    try {
        const { nombre, email, sexo, area_id, descripcion, boletin } = req.body;

        const nuevoEmpleado = await EmpleadoModel.create({
            nombre,
            email,
            sexo,
            area_id,
            descripcion,
            boletin
        });

        res.status(201).json({ message: 'Empleado guardado con éxito', empleado: nuevoEmpleado });
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
};