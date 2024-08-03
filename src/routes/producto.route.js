import { Router } from "express";
import {
  crear,
  editar,
  one,
  all,
  borrar,
  categorias,
  getInventario,
  registarIngresoStock,
} from "../controllers/producto.controller.js";
import { validarCodigoProducto } from "../middlewares/producto.middleware.js";
// import { checkToken } from '../middlewares/checkToken.js'

const router = Router();

// RUTAS GENERALES
router.get("/productos/one/:id", one);
router.get("/productos/all", all);
router.get("/productos/categorias", categorias);
router.get("/productos/inventario", getInventario);
router.post("/productos/create", validarCodigoProducto, crear);
router.put("/productos/update-stock/:id", registarIngresoStock)

// RUTAS ADMIN
router.put("/admin/productos/edit/:id", editar);
router.put("/admin/productos/delete/:id", borrar);

export default router;
