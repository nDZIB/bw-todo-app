export interface ICrudeRepository<T> {
    addTask(data: T): Promise<T>;
    updateTask(itemId: number, data: any): Promise<T>;
    deleteTask(data: any): Promise<void>;
    getTasks(page: number, limit:number): Promise<[T[], number]>;
}