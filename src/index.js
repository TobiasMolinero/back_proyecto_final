import app from './app.js'
import { PORT } from './config.js'

app.listen(PORT, () => {
    console.log(`La API esta escuchando en el puerto ${PORT}`)
})