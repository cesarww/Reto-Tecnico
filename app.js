import express from 'express'
import cors from 'cors';
import empresasRoutes from './src/routes/empresas.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(empresasRoutes)

export default app