import { Router } from 'express'
import { crear, editar, one, all, borrar, categorias } from '../controllers/producto.controller.js'
// import { checkToken } from '../middlewares/checkToken.js' 

const router = Router()

// RUTAS GENERALES
router.get('/productos/one/:id', one)
router.get('/productos/all', all)
router.get('/productos/categorias', categorias)
router.post('/productos/create', crear)

// RUTAS ADMIN
router.put('/admin/productos/edit/:id', editar)
router.put('/admin/productos/delete/:id', borrar)

export default router