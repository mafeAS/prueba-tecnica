import express from 'express'
import {getAllAreas, getAllRoles, getAllEmpleados, guardarEmpleado} from '../controllers/FormularioController.js'
const router =express.Router()

router.get('/areas', getAllAreas)
router.get('/roles',getAllRoles)
router.get('/empleado', getAllEmpleados)
router.post('/guardar', guardarEmpleado);


export default router