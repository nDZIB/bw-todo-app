import { UserDTO } from "./user.dto";

export class AuthUserDTO extends UserDTO {
    token: string;
}