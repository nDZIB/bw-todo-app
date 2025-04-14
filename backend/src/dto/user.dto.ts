import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    username: string;

    @Expose()
    id: number;
}