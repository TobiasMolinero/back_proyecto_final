import { pool } from "../db.js";

export const comprobarGastoEliminado = (req, res, next) => {
    const {detalle} = req.body

    pool.query(`SELECT id_gasto, detalle FROM gasto
                WHERE detalle = '${detalle}' AND estado_registro = 0
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else if(results.length !== 0){
            pool.query(`UPDATE gasto SET estado_registro = 1
                        WHERE detalle = '${detalle}' AND estado_registro = 0    
            `, (error) => {
                if(error){
                    res.status(500).json({
                        message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
                    })
                } else {
                    res.status(200).json({
                        message: 'La categoría se registró con exito.'
                    })
                }
            })
        } else if(results.length === 0){
            next()
        }
    })
}