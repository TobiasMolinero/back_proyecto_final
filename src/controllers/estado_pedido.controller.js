import { pool } from '../db.js'

export const crear = (req, res) => {
    const {descripcion} = req.body

    pool.query(`INSERT INTO estado_pedido(descripcion)
                VALUES('${descripcion}')
    `, (error) => {
        if(error){
            console.log(error)
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El nuevo estado de pedido se creó con exito.'
            })
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {descripcion} = req.body

    pool.query(`UPDATE estado_pedido SET   
                descripcion = '${descripcion}'
                WHERE id_estado_pedido = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El estado de pedido se modificó con exito.'
            })
        }
    })
}   

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT id_estado_pedido, descripcion FROM estado_pedido
                WHERE id_estado_pedido = ${id} AND estado_registro = 1
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
    pool.query(`SELECT id_estado_pedido, descripcion FROM estado_pedido 
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

    pool.query(`UPDATE estado_pedido SET
                estado_registro = 0
                WHERE id_estado_pedido = ${id}
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