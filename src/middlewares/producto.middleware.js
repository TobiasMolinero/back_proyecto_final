import { pool } from "../db.js";

export const validarCodigoProducto = (req, res, next) => {
    const {cod_producto} = req.body
    
    pool.query(`SELECT cod_producto FROM producto WHERE cod_producto = '${cod_producto}' AND estado_registro = 1
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el sevidor.'
            })
        } else {
            if(results.length > 0){
                res.status(409).json({
                    message: 'El codigo de producto introducido ya existe'
                })
            } else {
                next()
            }
        }
    })
}