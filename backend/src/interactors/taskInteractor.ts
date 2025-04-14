import { inject, injectable } from "inversify";
import { ITaskInteractor } from "../interfaces/ITaskInteractor";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { Task } from "../entities/task.entity";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { CreateTaskDTO } from "../dto/create-task.dto";
import { plainToClass } from "class-transformer";
import { TaskDTO } from "../dto/task.dto";
import { Paginated } from "../dto/paginated.dto";
import { NotFoundError } from "../midleware/exceptions";
import { UserInteractor } from "./userInteractor";

@injectable()
export class TaskInteractor implements ITaskInteractor {
    private taskRepository: ICrudeRepository<Task>;
    private userInteractor: UserInteractor;

    constructor(
        @inject(INTERFACE_TYPE.TaskRepository) taskRepository: ICrudeRepository<Task>,
        @inject(INTERFACE_TYPE.UserInteractor) userInteractor: UserInteractor
    ) {
        this.taskRepository = taskRepository;
        this.userInteractor = userInteractor
    }

    async addTask(data: CreateTaskDTO, user: number): Promise<TaskDTO> {
        const userDetails = await this.userInteractor.getUserById(user);
        const task: Task = plainToClass(Task, data);
        task.user = userDetails;
        const savedTask = await this.taskRepository.add(task);
        return plainToClass(TaskDTO, savedTask);
    }

    async updateTask(taskId: number, data: CreateTaskDTO, user: number): Promise<TaskDTO> {
        await this.getTask(taskId, user);
        const updatedTask = await this.taskRepository.update(taskId, data);
        return plainToClass(TaskDTO, updatedTask);
    }
    async deleteTask(taskId: number, user: number): Promise<void> {
        const task = await this.getTask(taskId, user);
        await this.taskRepository.delete(taskId);
        return;
    }
    async getTasks(page: number, limit: number, user: number): Promise<Paginated<TaskDTO>> {
        const [tasks, total] = await this.taskRepository.getManyBy(page, limit, {
            user: {
                id: user
            }
        });
        return {
            data: tasks.map(task => plainToClass(TaskDTO, task)),
            limit,
            page,
            total
        }
    }

    private async getTask(id: number, userId: number): Promise<Task> {
        const task = await this.taskRepository.getBy({
            id: id,
            user: {
                id: userId
            }
        });
        if (task) {
            return task;
        } else {
            // if task does not exist by id throw error
            throw new NotFoundError('Task not found')
        }
    }
}