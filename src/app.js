import express from 'express'
import morgan from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

//IMPORTAMOS RUTAS
import indexRoute from './routes/index.route.js'

//MIDDLEWARES
const app = express()
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

//USAMOS LAS RUTAS
app.use('/', indexRoute)

export default app