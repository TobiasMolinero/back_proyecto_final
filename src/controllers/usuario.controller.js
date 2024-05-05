import { pool } from '../db.js'
import { encrypt, verified } from '../utils/encrypt.js'
import { generateToken } from '../utils/jwt.js'

export const login = (req, res) => {
    const {usuario, contraseña} = req.body

    pool.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'
    `, async(error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo mas tarde.'
            })
        } else if(results.length > 0){
            const user = results
            const match = await verified(contraseña, user[0].contraseña)
            const token = generateToken(user[0].usuario);

            if(match){
                var userData = results[0];
                delete userData.contraseña;
                res.status(200).json({
                    message: 'Iniciaste sesión con exito.',
                    data: userData,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Contraseña incorrecta.'
                });
            }
        } else {
            res.status(404).json({
                message: 'El usuario ingresado no existe.'
            });
        }
    })
}

export const altaUsuario = async(req, res) => {
    const {usuario, contraseña, id_rol} = req.body

    const passHash = await encrypt(contraseña)

    pool.query(`INSERT INTO usuario(usuario, contraseña, id_rol_usuario, id_persona)
                VALUES('${usuario}', '${passHash}', ${id_rol}, (SELECT id_persona FROM persona ORDER BY id_persona DESC LIMIT 1))
    `, (error) => {
        if(error){
            console.log(error)
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
    pool.query('SELECT id_usuario, id_persona, nombre, apellido, correo, telefono, usuario, rol FROM usuarios_persona' , (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
} 

export const listarUsuario = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT * FROM usuarios_persona WHERE id_usuario = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
} 

export const modificarUsuario = (req, res) => {
    const id = req.params.id
    const { usuario, id_rol } = req.body

    pool.query(`UPDATE usuario SET 
                usuario = '${usuario}',
                id_rol_usuario = ${id_rol}
                WHERE id_usuario = ${id}
    `, (error) => {
        if(error){
            console.log(error)
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
    const id = req.params.id;
    const {id_persona} = req.body;

    pool.query(`DELETE FROM usuario
                WHERE id_usuario = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        }
    })

    pool.query(`DELETE FROM persona WHERE id_persona = ${id_persona}
    `, (error) => {
        if(error){
        console.log(error)
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El usuario se dio de baja con exito.'
            })
            return
        }
    })
}
