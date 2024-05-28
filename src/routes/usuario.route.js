import { Router } from 'express'
import { 
    login,
    altaUsuario, 
    listadoUsuarios, 
    listarUsuario, 
    modificarUsuario, 
    bajaUsuario,
    modificarContraseña,
    getRoles
} from '../controllers/usuario.controller.js';
// import { checkToken } from '../middlewares/checkToken.js';
import { validarUsuarioExistente, validarContraseña, altaPersona, editarPersona } from '../middlewares/usuario.middleware.js';

const router = Router()

// RUTAS GENERALES
router.get('/usuarios/one/:id', listarUsuario)
router.get('/usuarios/roles', getRoles)
router.post('/usuarios/login', login)

// RUTAS ADMIN
router.get('/admin/usuarios/listarusuarios', listadoUsuarios)
router.post('/admin/usuarios/altausuario', validarUsuarioExistente, validarContraseña, altaPersona, altaUsuario)
router.put('/admin/usuarios/edit/:id', validarUsuarioExistente,editarPersona, modificarUsuario)
router.put('/admin/usuarios/editpassword/:id', modificarContraseña)
router.put('/admin/usuarios/bajausuario/:id', bajaUsuario)

export default router