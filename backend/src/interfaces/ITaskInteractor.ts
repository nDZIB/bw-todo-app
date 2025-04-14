import { CreateTaskDTO } from "../dto/create-task.dto";
import { Paginated } from "../dto/paginated.dto";
import { TaskDTO } from "../dto/task.dto";

export interface ITaskInteractor {
    addTask(data: CreateTaskDTO, user: number): Promise<TaskDTO>;
    updateTask(taskId: number, data: CreateTaskDTO, user: number): Promise<TaskDTO>;
    deleteTask(id: number, user: number): Promise<void>;
    getTasks(page: number, limit:number, user: number): Promise<Paginated<TaskDTO>>;
}