import { injectable } from "inversify";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { AppDataSource } from "../lib/typeorm/data-source";
import { User } from "../entities/user.entity";
import { BusinessError } from "../midleware/exceptions";
import { FindOptionsWhere } from "typeorm";

const typeormRepo = AppDataSource.getRepository(User)

@injectable()
export class UserRepository implements ICrudeRepository<User> {
    async add(data: User): Promise<User> {
        const user = await this.getByName(data.username);
        if (user) {
            throw new BusinessError('Username already taken')
        }
        return typeormRepo.save(data)
    }

    async getByName(username: string) {
        return typeormRepo.findOneBy({
            username: username
        })
    }

    async getBy(query: FindOptionsWhere<User>): Promise<User | null> {
        return typeormRepo.findOneBy(query);
    }

    async getById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async update(id: number, data: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getMany(page: number, limit: number): Promise<[User[], number]> {
        throw new Error("Method not implemented.");
    }

    getManyBy(page: number, limit: number, query: FindOptionsWhere<User>): Promise<[User[], number]> {
        throw new Error("Method not implemented.");
    }
}