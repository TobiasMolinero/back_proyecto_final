import express from 'express'
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

//IMPORTAMOS RUTAS
import indexRoute from './routes/index.route.js'
import usuarios from './routes/usuario.route.js'
import estado_pedido from './routes/estado_pedido.route.js'
import clientes from './routes/cliente.route.js'

//MIDDLEWARES
const app = express()
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

//USAMOS LAS RUTAS
app.use('/', indexRoute)
app.use('/', usuarios)
app.use('/', estado_pedido)
app.use('/', clientes)

export default app