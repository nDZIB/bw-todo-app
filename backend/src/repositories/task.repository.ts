import { injectable } from "inversify";
import { Task } from "../entities/task.entity";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { AppDataSource } from "../lib/typeorm/data-source";
import { User } from "../entities/user.entity";
import { FindOptionsWhere } from "typeorm";

const typeormRepo = AppDataSource.getRepository(Task)

@injectable()
export class TaskRepository implements ICrudeRepository<Task> {
    async add(data: Task): Promise<Task> {
        return typeormRepo.save(data)
    }

    async update(taskId: number, data: any): Promise<Task> {
        await typeormRepo.update({
            id: taskId
        }, data)

        return (await typeormRepo.findOneBy({ id: taskId }))!
    }

    async delete(id: number): Promise<void> {
        await typeormRepo.delete({id})
        return;
    }

    async getMany(page: number, limit: number): Promise<[Task[], number]> {
        return typeormRepo.findAndCount({
            skip: limit * page,
            take: limit
        })
    }

    getManyBy(page: number, limit: number, query: FindOptionsWhere<Task>): Promise<[Task[], number]> {
        return typeormRepo.findAndCount({
            skip: limit * page,
            take: limit,
            where: query
        })
    }

    getBy(query: FindOptionsWhere<Task>): Promise<Task | null> {
        return typeormRepo.findOneBy(query)
    }

    async getById(id: number): Promise<Task | null> {
        return typeormRepo.findOneBy({ id })
    }

}