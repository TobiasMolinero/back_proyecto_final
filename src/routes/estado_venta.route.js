import { Router } from "express"
import { crear, editar, one, all, borrar } from '../controllers/estado_venta.controller.js'
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/estado-venta/all', all)

// RUTAS ADMIN
router.get('/admin/estado-venta/one/:id', one)
router.post('/admin/estado-venta/create', crear)
router.put('/admin/estado-venta/edit/:id', editar)
router.put('/admin/estado-venta/delete/:id', borrar)

export default router