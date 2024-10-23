import {Router} from 'express'
import {crearEmpresa,obtenerEmpresas,modificarEmpresa,borrarEmpresa} from '../controllers/Empresas.controller.js'

const router = Router()

//Rutas definidas para las empresas
router.post('/agregarEmpresas', crearEmpresa)
router.get('/obtenerEmpresas', obtenerEmpresas)
router.put('/actualizaEmpresas/:id', modificarEmpresa)
router.delete('/borrarEmpresas/:id', borrarEmpresa);

export default router