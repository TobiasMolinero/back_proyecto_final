import { pool } from '../db.js'

export const crear = (req, res) => {
    const {id_categoria_gasto, fecha, importe, detalle} = req.body

    pool.query(`INSERT INTO gasto(id_categoria_gasto, fecha, importe, detalle)
                VALUES(${id_categoria_gasto}, '${fecha}', ${importe}, '${detalle}')
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentar más tarde.'
            })
        } else {
            res.status(200).json({
                message: 'El gasto se registro con exito.'
            })
        }
    })  
}

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT id_gasto, id_categoria_gasto, fecha, importe, detalle
                FROM gasto WHERE id_gasto = ${id}
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentar más tarde.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
}

export const all = (req, res) => {
    pool.query('SELECT * FROM gastos_varios', (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentar más tarde.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
}

export const editar = (req, res) => {
    const id = req.params.id
    const {id_categoria_gasto, fecha, importe, detalle} = req.body

    pool.query(`UPDATE gasto SET id_categoria_gasto = ${id_categoria_gasto},
                fecha = '${fecha}',
                importe = ${importe},
                detalle = '${detalle}'
                WHERE id_gasto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentar más tarde.'
            })
        } else {
            res.status(200).json({
                message: 'El registro se modificó con exito.'
            })
        }
    })
}

export const borrar = (req, res) => {
    const id = req.params.id

    pool.query(`DELETE FROM gasto WHERE id_gasto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentar más tarde.'
            })
        } else {
            res.status(200).json({
                message: 'El registro se eliminó con exito.'
            })
        }
    })
}

export const crearCategoria = (req, res) => {
    const {descripcion} = req.body

    pool.query(`INSERT INTO categoria_gasto(descripcion)
                VALUES('${descripcion}')
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else {
            res.status(200).json({
                message: 'La nueva categoría se registro con exito.'
            })
        }
    })
}

export const allCategorias = (req, res) => {
    pool.query('SELECT id_categoria_gasto, descripcion FROM categoria_gasto WHERE estado_registro = 1'
    , (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else {
            res.status(200).json({
                data: results
            })
        }
    })
}

export const editarCategoria = (req, res) => {
    const id = req.params.id
    const {descripcion} = req.body

    pool.query(`UPDATE categoria_gasto SET 
                descripcion = '${descripcion}'
                WHERE id_categoria_gasto = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else{
            res.status(200).json({
                message: 'La categoria de gasto se modificó con exito.'
            })
        }
    })
}

export const bajaCategoria = (req, res) => {
    const id = req.params.id

    pool.query(`UPDATE categoria_gasto SET
                estado_registro = ${0}
                WHERE id_categoria_gasto = ${id}   
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else {
            res.status(200).json({
                message: 'La categoria de gasto se eliminó con exito.'
            })
        }
    })
}