import { Router } from "express"
import { crear, editar, one, all, borrar } from '../controllers/categoria_producto.controller.js'
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/cat-producto/all', all)
router.get('/cat-producto/one/:id', one)
router.post('/cat-producto/create', crear)
router.put('/cat-producto/edit/:id', editar)

// RUTAS ADMIN
router.put('/admin/cat-producto/delete/:id', borrar)

export default router