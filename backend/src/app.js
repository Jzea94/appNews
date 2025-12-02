import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// middlewares
app.disable('x-powered-by')
app.use(express.json()) // Analiza el cuerpo de las solicitudes HTTP en formato json y las hace accesibles en el obj req.body
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
})) // Permite comunicación entre servicios con origenes diferentes (Cross-Origin Resource Sharing)
app.use(cookieParser()) // expone las cookies en req.cookies

export default app
