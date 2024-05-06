import { Router } from "express"
import { crear, editar, one, all, borrar } from '../controllers/categoria_producto.controller.js'
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/cat-product/all', all)

// RUTAS ADMIN
router.get('/admin/cat-product/one/:id', one)
router.post('/admin/cat-product/create', crear)
router.put('/admin/cat-product/edit/:id', editar)
router.put('/admin/cat-product/delete/:id', borrar)

export default router