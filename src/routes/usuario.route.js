import { Router } from 'express'
import { 
    login,
    altaUsuario, 
    listadoUsuarios, 
    listarUsuario, 
    modificarUsuario, 
    bajaUsuario,
    modificarContraseña
} from '../controllers/usuario.controller.js'

const router = Router()

router.get('/usuarios/one/:id', listarUsuario)
router.get('/usuarios/listarusuarios', listadoUsuarios)
router.post('/usuarios/login', login)
router.post('/usuarios/altausuario', altaUsuario)
router.put('/usuarios/edit/:id', modificarUsuario)
router.put('/usuarios/editpassword/:id', modificarContraseña)
router.put('/usuarios/bajausuario/:id', bajaUsuario)

export default router