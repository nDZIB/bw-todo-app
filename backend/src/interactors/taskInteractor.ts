import { inject, injectable } from "inversify";
import { ITaskInteractor } from "../interfaces/ITaskInteractor";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { Task } from "../entities/task.entity";
import { INTERFACE_TYPE } from "../utils/app.constant";

@injectable()
export class TaskInteractor implements ITaskInteractor {
    private taskRepository: ICrudeRepository<Task>;

    constructor(@inject(INTERFACE_TYPE.TaskRepository) taskRepository: ICrudeRepository<Task>) {
        this.taskRepository = taskRepository
    }

    addTask(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateTask(taskId: number, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTask(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTasks(page: number, limit: number): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}