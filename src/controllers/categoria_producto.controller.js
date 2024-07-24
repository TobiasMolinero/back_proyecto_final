import { pool } from '../db.js'

export const crear = (req, res) => {
    const {categoria_producto} = req.body

    pool.query(`INSERT INTO categoria_producto(categoria_producto)
                VALUES('${categoria_producto}')
    `, (error) => {
        if(error){
            console.log(error)
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'La nueva categoria de producto se creó con exito.'
            })
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {categoria_producto} = req.body

    pool.query(`UPDATE categoria_producto SET   
                categoria_producto = '${categoria_producto}'
                WHERE id_categoria_producto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'La categoria de producto se modificó con exito.'
            })
        }
    })
}   

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT id_categoria_producto, categoria_producto FROM categoria_producto
                WHERE id_categoria_producto = ${id} AND estado_registro = 1
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
    pool.query(`SELECT id_categoria_producto, categoria_producto FROM categoria_producto 
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

    pool.query(`UPDATE categoria_producto SET
                estado_registro = 0
                WHERE id_categoria_producto = ${id}
    `, (error) => {
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