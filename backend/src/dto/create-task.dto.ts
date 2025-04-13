import { Expose } from "class-transformer";

export class CreateTaskDTO {
    @Expose()
    title: string;

    @Expose()
    description: string;
}