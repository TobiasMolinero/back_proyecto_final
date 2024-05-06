import { Router } from "express"
import { crear, editar, one, all, borrar } from '../controllers/estado_pedido.controller.js'
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// TODAS LAS RUTAS SON PARA ADMIN
router.get('/admin/estado-pedido/one/:id', one)
router.get('/admin/estado-pedido/all', all)
router.post('/admin/estado-pedido/create', crear)
router.put('/admin/estado-pedido/edit/:id', editar)
router.put('/admin/estado-pedido/delete/:id', borrar)

export default router