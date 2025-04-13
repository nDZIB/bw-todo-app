import { Request, Router, Response, NextFunction } from 'express'
import { TaskController } from '../controllers/task.controller';
import { Container } from 'inversify';
import { ITaskInteractor } from '../interfaces/ITaskInteractor';
import { INTERFACE_TYPE } from '../utils/app.constant';
import { TaskInteractor } from '../interactors/taskInteractor';
import { ICrudeRepository } from '../interfaces/ICrudeRespository';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';

// setup D/I with inversify
const container = new Container();
container.bind<ICrudeRepository<Task>>(INTERFACE_TYPE.TaskRepository).to(TaskRepository);
container.bind<ITaskInteractor>(INTERFACE_TYPE.TaskInteractor).to(TaskInteractor);
container.bind(INTERFACE_TYPE.TaskController).to(TaskController);

const taskController = container.get<TaskController>(INTERFACE_TYPE.TaskController);

const taskRouter: Router = Router();

taskRouter.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    return taskController.onGetTasks(1, 2);
})
taskRouter.patch('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    return taskController.onUpdateTask(+req.params.id, req.body);
})
taskRouter.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await taskController.onAddTask(req.body);
        resp.status(201).json(responseData)
    } catch (error) {
        next(error)
    }
})
taskRouter.delete('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    return taskController.onDeleteTask(+req.params.id);
})

export default taskRouter;