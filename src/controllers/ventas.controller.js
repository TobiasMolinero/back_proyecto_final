import { pool, pool2 } from '../db.js'

export const crearVenta = (req, res, next) => {
    const {nro_factura, fecha, id_cliente, id_tipo_factura, id_metodo_pago, id_estado_pedido, observaciones, importe_total} = req.body

    pool.query(`INSERT INTO venta(nro_factura, fecha, id_cliente, id_tipo_factura, id_metodo_pago, id_estado_pedido, observaciones, importe_total)
                VALUES(${nro_factura}, '${fecha}', ${id_cliente}, ${id_tipo_factura}, ${id_metodo_pago}, ${id_estado_pedido}, '${observaciones}', ${importe_total})
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            next()
        }
    })
} 

export const crearDetalle = async(req, res) => {
    const {detalles} = req.body
    try {
        const results = []
        detalles.forEach(async detalle => {
            const query = 'INSERT INTO detalle_venta(id_venta, id_producto, cantidad) VALUES(?, ?, ?)'
            const [result] = await pool2.query(query, [detalle.id_venta, detalle.id_producto, detalle.cantidad]) 
            results.push(result)
            
        });
        res.status(200).json({
            message: 'El pedido fue creado con exito.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un error en el servidor.'
        })
    }
}

// export const editarVenta = (req, res) => {
//     const id = req.params.id
//     const {fecha, id_cliente, observaciones, importe_total} = req.body

//     pool.query(`UPDATE pedido SET 
//                 fecha = '${fecha}', 
//                 id_cliente = ${id_cliente},
//                 observaciones = '${observaciones}',
//                 importe_total = ${importe_total}
//                 WHERE nro_pedido = ${id}
//     `, (error) => {
//         if(error){
//             res.status(500).json({
//                 message: 'Ocurrio un error en el servidor.'
//             })
//         } else {
//             res.status(200).json({
//                 message: 'Los datos del pedido se modificaron con exito.'
//             })
//         }
//     })
// }

// export const cambiarEstadoVenta = (req, res) => {
//     const id = req.params.id
//     const {id_estado_venta} = req.body

//     pool.query(`UPDATE venta SET
//                 id_estado_venta = ${id_estado_venta}
//                 WHERE id_venta = ${id}
//     `, (error) => {
//         if(error){
//             res.status(500).json({
//                 message: 'Ocurrio un error en el servidor.'
//             }) 
//         } else {
//             res.status(200).json({
//                 message: 'El estado del pedido cambió con exito.'
//             })
//         }
//     })
// } 

export const one = (req, res) => {
    const id = req.params.id

    pool.query(`SELECT * FROM ventas
                WHERE id_venta = ${id}
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
    pool.query(`SELEC * FROM ventas`, (error, results) => {
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

    pool.query(`UPDATE venta SET 
                estado_registro = 0
                WHERE id_venta = ${id}
    `, (error) => {
        if(error){
            res.status(500).json({
                message: 'Ocurrio un error en el servidor.'
            })
        } else {
            res.status(200).json({
                message: 'El pedido se dio de baja con exito.'
            })
        }
    })
}
