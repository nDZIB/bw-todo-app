import 'reflect-metadata'

import express from 'express'
import taskRouter from './routes/task.routes';
import Swagger  from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import cors from 'cors';
import { AppDataSource } from './lib/typeorm/data-source';

const PORT = process.env.PORT || 8080;
const app = express()
const allowedOrigins = ['http://localhost:4200'];


app.use(cors({
    origin: allowedOrigins
}))
app.use(express.json())

AppDataSource.initialize()

app.use('/api/v1/tasks', taskRouter)
app.use("/docs", Swagger.serve, Swagger.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log(`TODO API running at :${PORT}`)
})

process.on('uncaughtException', async (err) => {
    console.log(err);
    process.exit(1)
})