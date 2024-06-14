import { pool } from "../db.js";

export const comprobarCatGastoEliminado = (req, res, next) => {
    const {descripcion} = req.body

    pool.query(`SELECT descripcion FROM categoria_gasto
                WHERE descripcion = '${descripcion}' AND estado_registro = 0
    `, (error, results) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor. Vuelva a intentarlo más tarde.'
            })
        } else if(results.length !== 0){
            pool.query(`UPDATE categoria_gasto SET estado_registro = 1
                        WHERE descripcion = '${descripcion}' AND estado_registro = 0    
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