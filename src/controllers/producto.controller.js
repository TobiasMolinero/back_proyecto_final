import { pool } from '../db.js'

export const crear = (req, res) => {
    const {cod_producto, id_categoria_producto, nombre_producto, descripcion, stock, precio} = req.body

    pool.query(`INSERT INTO producto(cod_producto, nombre_producto, id_categoria_producto, descripcion, precio)
                VALUES('${cod_producto}', '${nombre_producto}', ${id_categoria_producto}, '${descripcion}', ${precio})
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            pool.query(`INSERT INTO inventario(id_producto, stock)
                        VALUES((SELECT id_producto FROM producto ORDER BY id_producto DESC LIMIT 1), ${stock})    
            `, (error) => {
                if(error){
                    res.status(500).json({
                        message: 'Ocurrio un error en el servidor.'
                    })
                } else {
                    res.status(200).json({
                        message: 'El producto fue creado con exito.'
                    })
                }
            }) 
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {cod_producto, id_categoria_producto, nombre_producto, descripcion, precio} = req.body

    pool.query(`UPDATE producto SET 
                cod_producto = '${cod_producto}',
                id_categoria_producto = ${id_categoria_producto},
                nombre_producto = '${nombre_producto}',
                descripcion = '${descripcion}',
                precio = ${precio}
                WHERE id_producto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'Los datos del producto se modificarón con exito.'
            })
        }
    })
}

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT * FROM productos WHERE id_producto = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servido.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
}

export const all = (req, res) => {
    pool.query('SELECT * FROM productos', (error, results) => {
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

    pool.query(`UPDATE producto SET estado_registro = 0
                WHERE id_producto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El producto se dio de baja con exito.'
            })
        }
    })
}

export const categorias = (req, res) => {
    pool.query('SELECT id_categoria_producto, categoria_producto FROM categoria_producto'
    , (error, results) => {
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

export const getInventario = (req, res) => {
    pool.query('SELECT * FROM stock', (results, error) => {
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