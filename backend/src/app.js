import express from 'express'
import cors from 'cors'

const app = express()

// middlewares
app.disable('x-powered-by')
app.use(express.json()) // Analiza el cuerpo de las solicitudes HTTP en formato json y las hace accesibles en el obj req.body
app.use(cors()) // Permite comunicación entre servicios con origenes diferentes (Cross-Origin Resource Sharing)

export default app
