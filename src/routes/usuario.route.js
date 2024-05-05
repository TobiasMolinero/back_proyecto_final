import { Router } from 'express'
import { 
    login,
    altaUsuario, 
    listadoUsuarios, 
    listarUsuario, 
    modificarUsuario, 
    bajaUsuario,
    modificarContraseña
} from '../controllers/usuario.controller.js';
import { checkToken } from '../middlewares/checkToken.js';
import { validarUsuarioExistente, validarContraseña, altaPersona, editarPersona } from '../middlewares/usuario.middleware.js';

const router = Router()

// RUTAS GENERALES
router.get('/usuarios/one/:id', checkToken, listarUsuario)
router.post('/usuarios/login', login)

// RUTAS ADMIN
router.get('/admin/usuarios/listarusuarios', checkToken, listadoUsuarios)
router.post('/admin/usuarios/altausuario', checkToken, validarUsuarioExistente, validarContraseña, altaPersona, altaUsuario)
router.put('/admin/usuarios/edit/:id', checkToken, editarPersona, modificarUsuario)
router.put('/admin/usuarios/editpassword/:id', checkToken, modificarContraseña)
router.put('/admin/usuarios/bajausuario/:id', checkToken, bajaUsuario)

export default router