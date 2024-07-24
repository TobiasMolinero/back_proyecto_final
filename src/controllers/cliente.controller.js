import { pool } from '../db.js'

export const crear = (req, res) => {
    const {nombre, apellido, nro_documento, razon_social, domicilio, telefono, correo} = req.body

    pool.query(`INSERT INTO cliente(nombre, apellido, nro_documento, razon_social, domicilio, telefono, correo)
                VALUES('${nombre}', '${apellido}', ${nro_documento}, '${razon_social}', '${domicilio}', '${telefono}', '${correo}')
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El cliente se registró con exito.'
            })
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {nombre, apellido, nro_documento,razon_social, domicilio, telefono, correo} = req.body

    pool.query(`UPDATE cliente SET 
                nombre = '${nombre}',
                apellido = '${apellido}',
                nro_documento = ${nro_documento},
                razon_social = '${razon_social}',
                domicilio = '${domicilio}',
                telefono = '${telefono}',
                correo = '${correo}'
                WHERE id_cliente = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'Los datos del cliente se modificarón con exito.'
            })
        }
    })
}

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT * FROM cliente WHERE id_cliente = ${id}
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

export const all = (req, res) => {
    pool.query(`SELECT * FROM cliente WHERE activo = 1
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

export const borrar = (req, res) => {
    const id = req.params.id

    pool.query(`UPDATE cliente SET activo = 0
                WHERE id_cliente = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El cliente se dio de baja con exito.'
            })
        }
    })
}