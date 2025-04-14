import { Expose } from "class-transformer";

export class CreateUserDTO {
    @Expose()
    username: string;

    @Expose()
    password: string;
}