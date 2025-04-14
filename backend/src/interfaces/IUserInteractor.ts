import { AuthUserDTO } from "../dto/authuser.dto";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";


export interface IUserInteractor {
    signIn(data: CreateUserDTO): Promise<AuthUserDTO>;
    addUser(data: CreateUserDTO): Promise<UserDTO>;
    getUserById(userId: number): Promise<UserDTO>;
}