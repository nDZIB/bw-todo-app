import { CreateTaskDTO } from "../dto/create-task.dto";
import { Paginated } from "../dto/paginated.dto";
import { TaskDTO } from "../dto/task.dto";

export interface ITaskInteractor {
    addTask(data: CreateTaskDTO): Promise<TaskDTO>;
    updateTask(taskId: number, data: CreateTaskDTO): Promise<TaskDTO>;
    deleteTask(id: number): Promise<void>;
    getTasks(page: number, limit:number): Promise<Paginated<TaskDTO>>;
}