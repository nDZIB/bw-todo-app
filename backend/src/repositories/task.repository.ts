import { injectable } from "inversify";
import { Task } from "../entities/task.entity";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { AppDataSource } from "../lib/typeorm/data-source";
import { User } from "../entities/user.entity";

const typeormRepo = AppDataSource.getRepository(Task)
const user = AppDataSource.getRepository(User)


@injectable()
export class TaskRepository implements ICrudeRepository<Task> {
    async addTask(data: Task): Promise<Task> {
        return typeormRepo.save(data)
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