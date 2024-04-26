import { pool } from '../db.js'
import { encrypt, verified } from '../utils/encrypt.js'
import { generateToken } from '../utils/jwt.js'

export const login = (req, res) => {
    const {usuario, contraseña} = req.body

    pool.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'
    `, async (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo mas tarde.'
            })
        } else if(results.length > 0){
            const user = results
            const match = await verified(contraseña, user[0].contraseña)

            if(match){
                var userData = results[0];
                delete userData.contraseña;
                res.status(200).json({
                    auth: true,
                    message: 'Iniciaste sesión con exito.',
                    userData
                });
            } else {
                res.status(401).json({
                    auth: false,
                    message: 'Contraseña incorrecta.'
                });
            }
        } else {
            res.status(404).json({
                auth: false,
                message: 'El usuario ingresado no existe.'
            });
        }
    })
}

export const altaUsuario = async(req, res) => {
    const {usuario, contraseña, id_rol_usuario} = req.body

    const passHash = await encrypt(contraseña)

    pool.query(`INSERT INTO usuario(usuario, contraseña, id_rol_usuario)
                VALUES('${usuario}', '${passHash}', ${id_rol_usuario})
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor al crear el usuario.'
            })
        } else {
            res.status(201).json({
                message: 'Usuario registrado con exito.'
            })
        }
    })
}

export const listadoUsuarios = (req, res) => {
    pool.query('SELECT * FROM usuarios' , (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json(results)
        }
    })
} 

export const listarUsuario = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT * FROM usuarios WHERE id_usuario = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json(results)
        }
    })
} 

export const modificarUsuario = (req, res) => {
    const id = req.params.id
    const { usuario, id_rol_usuario } = req.body

    pool.query(`UPDATE usuario SET 
                usuario = '${usuario}',
                id_rol_usuario = ${id_rol_usuario}
                WHERE id_usuario = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'Los datos del usuario se modificaron con exito.'
            })
        }
    })
} 

export const modificarContraseña = async(req, res) => {
    const id = req.params.id;
    const {nueva_contraseña} = req.body;
    const passHash = await encrypt(nueva_contraseña);
    pool.query(`UPDATE usuario SET contraseña = '${passHash}'
                WHERE id_usuario = ${id}
    ` , (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'La contraseña se modificó con exito.'
            })
        }
    })
}

export const bajaUsuario = (req, res) => {
    const id = req.params.id

    pool.query(`UPDATE usuario SET activo = 0
                WHERE id_usuario = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El usuario se dio de baja con exito.'
            })
        }
    })
}
