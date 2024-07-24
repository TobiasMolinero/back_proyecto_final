import { Router } from "express";
import { crearDetalle, one, all, borrar, crearVenta} from '../controllers/ventas.controller.js'

// import { checkToken } from '../middlewares/checkToken.js' 

const router = Router()

// RUTAS GENERALES
router.get('/ventas/one/:id', one)
router.get('/ventas/all', all)
router.post('/ventas/create', crearVenta, crearDetalle)
// router.put('/ventas/edit/:id', editar)

// RUTAS ADMIN
router.put('/admin/ventas/delete/:id', borrar)

export default router