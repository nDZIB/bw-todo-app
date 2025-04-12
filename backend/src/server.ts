import 'reflect-metadata'

import express, {Request, Response} from 'express'
import taskRouter from './routes/task.routes';
import Swagger  from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';

const PORT = process.env.PORT || 8080;

const app = express()
app.use(express.json())

app.use('/api/v1/tasks', taskRouter)


app.use("/docs", Swagger.serve, Swagger.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log(`TODO API running at :${PORT}`)
})

process.on('uncaughtException', async (err) => {
    console.log(err);
    process.exit(1)
})