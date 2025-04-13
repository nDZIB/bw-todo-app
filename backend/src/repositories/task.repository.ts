import { injectable } from "inversify";
import { Task } from "../entities/task.entity";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { AppDataSource } from "../lib/typeorm/data-source";
import { User } from "../entities/user.entity";

const typeormRepo = AppDataSource.getRepository(Task)

@injectable()
export class TaskRepository implements ICrudeRepository<Task> {
    async addTask(data: Task): Promise<Task> {
        return typeormRepo.save(data)
    }
    async updateTask(taskId: number, data: any): Promise<Task> {
        await typeormRepo.update({
            id: taskId
        }, data)

        return (await typeormRepo.findOneBy({ id: taskId }))!
    }
    async deleteTask(id: number): Promise<void> {
        await typeormRepo.delete({id})
        return;
    }
    async getTasks(page: number, limit: number): Promise<[Task[], number]> {
        return typeormRepo.findAndCount({
            skip: limit * page,
            take: limit
        })
    }

    async getTaskById(id: number): Promise<Task | null> {
        return typeormRepo.findOneBy({ id })
    }
}