import { Exclude, Expose } from "class-transformer";

export class TaskDTO {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}