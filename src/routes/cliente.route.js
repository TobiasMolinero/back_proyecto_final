import { Router } from 'express'
import { crear, editar, one, all, borrar} from '../controllers/cliente.controller.js'

// import { checkToken } from '../middlewares/checkToken.js'

const router = Router()

// RUTAS GENERALES
router.get('/clientes/one/:id', one)
router.get('/clientes/all', all)
router.post('/clientes/create', crear)
router.put('/clientes/edit/:id', editar)

//RUTAS ADMIN
router.put('/admin/clientes/delete/:id', borrar)

export default router