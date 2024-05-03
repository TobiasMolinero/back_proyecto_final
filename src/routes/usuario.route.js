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
import { validarUsuarioExistente, validarContraseña, altaPersona } from '../middlewares/usuario.middleware.js';

const router = Router()

router.get('/usuarios/one/:id', listarUsuario)
router.get('/usuarios/listarusuarios', listadoUsuarios)
router.post('/usuarios/login', login)
router.post('/usuarios/altausuario', validarUsuarioExistente, validarContraseña, altaPersona, altaUsuario)
router.put('/usuarios/edit/:id', modificarUsuario)
router.put('/usuarios/editpassword/:id', modificarContraseña)
router.delete('/usuarios/bajausuario/:id', bajaUsuario)

export default router