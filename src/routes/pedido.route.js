import { Router } from "express";
import { crearDetalle, one, all, borrar} from '../controllers/pedido.controller.js'

const router = Router()

// RUTAS GENERALES
router.get('/pedidos/one/:id', one)
router.get('/pedidos/all', all)
router.post('/pedidos/create', crearDetalle)
// router.put('/pedidos/edit/:id', editar)

// RUTAS ADMIN
router.put('/admin/pedidos/delete/:id', borrar)

export default router