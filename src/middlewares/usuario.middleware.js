import { pool } from '../db.js';

export const validarUsuarioExistente = (req, res, next) => {
    const id = req.params.id !== undefined ? req.params.id : 0

    const {usuario} = req.body;

    pool.query(`SELECT id_usuario, usuario FROM usuarios WHERE usuario = '${usuario}'
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            if(results.length > 0 && +id === 0){
                res.status(409).json({
                    message: 'El nombre de usuario ya existe.'
                })
            } else if(results.length > 0 && +id !== 0){
                if(results[0].id_usuario === +id){
                    next()
                } else {
                    res.status(409).json({
                        message: 'Ya existe otro usuario con ese nombre.'
                    })
                }
            } else {
                next()
            }
        }
    })
}

export const validarContraseña = (req, res, next) => {
    const {contraseña} = req.body;

    if(contraseña.length < 6){
        res.status(400).json({
            message: 'La contraseña debe tener al menos 6 caracteres'
        })
    }

    const expresionRegular = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,}$/;
    const esValida = expresionRegular.test(contraseña)

    if(esValida){
        next()
    } else {
        res.status(400).json({
            message: 'La contraseña debe contener al menos una mayuscula, un número y un caracter especial.'
        })
    }
}

export const altaPersona = (req, res, next) => {
    const {nombre, apellido, correo, telefono} = req.body;

    pool.query(`INSERT INTO persona(nombre, apellido, correo, telefono)
    VALUES('${nombre}', '${apellido}', '${correo}', '${telefono}')
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'     
            })
        } else {
            next();
        }
    })
}

export const editarPersona = (req, res, next) => {
    const id_usuario = req.params.id;
    const {nombre, apellido, correo, telefono} = req.body;

    pool.query(`SELECT id_persona FROM usuario WHERE id_usuario = ${id_usuario}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            const id_persona = results[0].id_persona;
            pool.query(`UPDATE persona SET
                        nombre = '${nombre}',
                        apellido = '${apellido}',
                        correo = '${correo}',
                        telefono = '${telefono}'
                        WHERE id_persona = ${id_persona}
            `, (error) => {
                if(error){
                    console.log('hola')
                    res.status(500).json({
                        message: 'Ocurrio un error en el servidor.'
                    })
                } else {
                    next();
                }
            })
        }
    })
}