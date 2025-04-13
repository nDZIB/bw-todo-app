import { inject, injectable } from "inversify";
import { ITaskInteractor } from "../interfaces/ITaskInteractor";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { Task } from "../entities/task.entity";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { CreateTaskDTO } from "../dto/create-task.dto";
import { plainToClass } from "class-transformer";
import { TaskDTO } from "../dto/task.dto";
import { Paginated } from "../dto/paginated.dto";

@injectable()
export class TaskInteractor implements ITaskInteractor {
    private taskRepository: ICrudeRepository<Task>;

    constructor(@inject(INTERFACE_TYPE.TaskRepository) taskRepository: ICrudeRepository<Task>) {
        this.taskRepository = taskRepository
    }

    async addTask(data: CreateTaskDTO): Promise<TaskDTO> {
        const task: Task = plainToClass(Task, data);
        const savedTask = await this.taskRepository.addTask(task);
        return plainToClass(TaskDTO, savedTask);
    }

    async updateTask(taskId: number, data: CreateTaskDTO): Promise<TaskDTO> {
        const task = await this.taskRepository.getTaskById(taskId);
        if(task) {
            const updatedTask = await this.taskRepository.updateTask(taskId, data);
            return plainToClass(TaskDTO, updatedTask);
        } else {
            // if task does not exist by id throw error
            throw new Error('Task not found')
        }
    }
    deleteTask(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getTasks(page: number, limit: number): Promise<Paginated<TaskDTO>> {
        const [tasks, total] =  await this.taskRepository.getTasks(page, limit);
        return {
            data: tasks.map(task => plainToClass(TaskDTO, task)),
            limit,
            page,
            total
        }
    }
}