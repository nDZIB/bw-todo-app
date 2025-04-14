import { Request, Router, Response, NextFunction } from 'express'
import { TaskController } from '../controllers/task.controller';
import { Container } from 'inversify';
import { ITaskInteractor } from '../interfaces/ITaskInteractor';
import { INTERFACE_TYPE } from '../utils/app.constant';
import { TaskInteractor } from '../interactors/taskInteractor';
import { ICrudeRepository } from '../interfaces/ICrudeRespository';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';
import { validate } from '../midleware/validate.middleware';
import { taskSchema } from '../dto/validation/task.schema';

// setup D/I with inversify
const container = new Container();
container.bind<ICrudeRepository<Task>>(INTERFACE_TYPE.TaskRepository).to(TaskRepository);
container.bind<ITaskInteractor>(INTERFACE_TYPE.TaskInteractor).to(TaskInteractor);
container.bind(INTERFACE_TYPE.TaskController).to(TaskController);

const taskController = container.get<TaskController>(INTERFACE_TYPE.TaskController);

const taskRouter: Router = Router();

taskRouter.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    const limit = +(req.query.limit || '10');
    const page = +(req.query.page || '0');
    try {
        const responseData = await taskController.onGetTasks(page, limit);
        resp.status(200).json(responseData)
    } catch (error) {
        next(error)
    }
})
taskRouter.patch('/:id', validate(taskSchema), async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await taskController.onUpdateTask(+req.params.id, req.body);
        resp.status(200).json(responseData)
    } catch (error) {
        next(error)
    }
})
taskRouter.post('/', validate(taskSchema), async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await taskController.onAddTask(req.body);
        resp.status(201).json(responseData)
    } catch (error) {
        next(error)
    }
})
taskRouter.delete('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await taskController.onDeleteTask(+req.params.id);
        resp.status(204).json(responseData)
    } catch (error) {
        console.log('In Route', error);
        
        next(error)
    }
})

export default taskRouter;