import { FindOptions, FindOptionsWhere } from "typeorm";

export interface ICrudeRepository<T> {
    add(data: T): Promise<T>;
    update(id: number, data: any): Promise<T>;
    delete(id: number): Promise<void>;
    getMany(page: number, limit:number): Promise<[T[], number]>;
    getManyBy(page: number, limit:number, query: FindOptionsWhere<T>): Promise<[T[], number]>;
    getById(id: number): Promise<T|null>;
    getBy(query: FindOptionsWhere<T>): Promise<T|null>;
}