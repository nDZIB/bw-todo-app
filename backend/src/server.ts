import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import taskRouter from './routes/task.routes';
import Swagger from 'swagger-ui-express';
import cors from 'cors';
import { AppDataSource } from './lib/typeorm/data-source';
import path from 'path';
import { errorHandler } from './midleware/error-handler.middleware';

const swaggerPath = process.env.DEPLOYMENT_ENV
    ? path.join(__dirname, './', 'swagger.json')
    : path.join(__dirname, '..', 'docs', 'swagger.json');

const PORT = process.env.PORT || 8080;
const app = express()
const allowedOrigins = ['http://localhost:4200'];

AppDataSource.initialize()

app.use(cors({
    origin: allowedOrigins
}))
app.use(express.json())
app.use('/api/v1/tasks', taskRouter)

// configure swagger docs
import(swaggerPath)
    .then(module => {
        const swaggerDocument = module.default;
        app.use("/docs", Swagger.serve, Swagger.setup(swaggerDocument))
    })
    .catch(error => {
        console.error('Error importing swagger.json:', error);
    });

app.listen(PORT, () => {
    console.log(`TODO API running at :${PORT}`)
})

app.use(errorHandler)