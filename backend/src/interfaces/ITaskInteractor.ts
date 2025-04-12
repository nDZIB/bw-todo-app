export interface ITaskInteractor {
    addTask(data: any): Promise<any>;
    updateTask(taskId: number, data: any): Promise<any>;
    deleteTask(data: any): Promise<void>;
    getTasks(page: number, limit:number): Promise<any[]>;
}