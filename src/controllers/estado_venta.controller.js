import { pool } from '../db.js'

export const crear = (req, res) => {
    const {estado} = req.body

    pool.query(`INSERT INTO estado_venta(estado)
                VALUES('${estado}')
    `, (error) => {
        if(error){
            console.log(error)
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El nuevo estado de venta se creó con exito.'
            })
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {estado} = req.body

    pool.query(`UPDATE estado_venta SET   
                estado = '${estado}'
                WHERE id_estado_venta = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El estado de venta se modificó con exito.'
            })
        }
    })
}   

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT id_estado_venta, estado FROM estado_venta
                WHERE id_estado_venta = ${id} AND estado_registro = 1
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
    pool.query(`SELECT id_estado_venta, estado FROM estado_venta
                WHERE estado_registro = 1
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

    pool.query(`UPDATE estado_venta SET
                estado_registro = 0
                WHERE id_estado_venta = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El registro se eliminó con exito'
            })
        }
    })
}