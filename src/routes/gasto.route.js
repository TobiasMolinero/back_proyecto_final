import { Router } from 'express'
import { all, allCategorias, bajaCategoria, borrar, crear, crearCategoria, editar, editarCategoria, one } from '../controllers/gasto.controller.js'
import { comprobarCatGastoEliminado } from '../middlewares/gasto.middleware.js'

const router = Router()

router.get('/gastos/all', all)
router.get('/gastos/one/:id', one)
router.post('/gastos/create', crear)
router.put('/gastos/edit/:id', editar)
router.delete('/gastos/delete/:id', borrar)

//Categoria gasto
router.get('/cat-gastos/all', allCategorias)
router.post('/cat-gastos/create', comprobarCatGastoEliminado, crearCategoria)
router.put('/cat-gastos/edit/:id', editarCategoria)
router.put('/cat-gastos/delete/:id', bajaCategoria)

export default router;