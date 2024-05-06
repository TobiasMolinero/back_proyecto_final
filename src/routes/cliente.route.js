import { Router } from 'express'
import { crear, editar, one, all, borrar} from '../controllers/cliente.controller.js'

// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/clientes/one/:id', one)
router.get('/clientes/all', all)
router.post('/clientes/create', crear)

//RUTAS ADMIN
router.put('/admin/clientes/edit/:id', editar)
router.put('/admin/clientes/delete/:id', borrar)

export default router