import { Router } from 'express'
import { crear, editar, one, all, borrar } from '../controllers/producto.controller.js'
// import { checkToken } from '../middlewares/checkToken.js' 

const router = Router()

// RUTAS GENERALES
router.get('/productos/one/:id', one)
router.get('/productos/all', all)

// RUTAS ADMIN
router.post('/admin/productos/create', crear)
router.put('/admin/productos/edit/:id', editar)
router.put('/admin/productos/delete/:id', borrar)

export default router