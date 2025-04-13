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

    updateTask(taskId: number, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTask(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getTasks(page: number, limit: number): Promise<Paginated<TaskDTO>> {
        throw new Error ('not implemented');
    }
}