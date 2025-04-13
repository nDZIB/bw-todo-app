export interface ICrudeRepository<T> {
    addTask(data: T): Promise<T>;
    updateTask(id: number, data: any): Promise<T>;
    deleteTask(id: number): Promise<void>;
    getTasks(page: number, limit:number): Promise<[T[], number]>;
    getTaskById(id: number): Promise<T|null>;
}