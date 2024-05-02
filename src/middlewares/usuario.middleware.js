import { pool } from '../db.js';

export const validarUsuarioExistente = (req, res, next) => {
    const {usuario} = req.body;

    pool.query(`SELECT usuario FROM usuarios WHERE usuario = '${usuario}'
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            if(results.length > 0){
                res.status(409).json({
                    message: 'El nombre de usuario ya existe.'
                })
            } else {
                next();
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