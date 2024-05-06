import { Router } from "express"
import { crear, editar, one, all, borrar } from '../controllers/estado_pedido.controller.js'
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/estado-pedido/all', all)

// RUTAS ADMIN
router.get('/admin/estado-pedido/one/:id', one)
router.post('/admin/estado-pedido/create', crear)
router.put('/admin/estado-pedido/edit/:id', editar)
router.put('/admin/estado-pedido/delete/:id', borrar)

export default router