import { injectable } from "inversify";
import { Task } from "../entities/task.entity";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";

@injectable()
export class TaskRepository implements ICrudeRepository<Task> {
    addTask(data: any): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    updateTask(itemId: number, data: any): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    deleteTask(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTasks(page: number, limit: number): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
}