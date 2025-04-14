import { inject, injectable } from "inversify";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { AuthError, NotFoundError } from "../midleware/exceptions";
import { IUserInteractor } from "../interfaces/IUserInteractor";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { plainToClass } from "class-transformer";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUserDTO } from "../dto/authuser.dto";

@injectable()
export class UserInteractor implements IUserInteractor {

    private readonly JWT_SECRET = 'ea385946a0e00d9330f9abbdbc52a652e64ee0d13ca9421a926078c88f0a937f'
    private userRepository: ICrudeRepository<User>;

    constructor(@inject(INTERFACE_TYPE.UserRepository) userRepository: ICrudeRepository<User>) {
        this.userRepository = userRepository
    }

    async addUser(data: CreateUserDTO): Promise<UserDTO> {
        const user = plainToClass(User, data);
        const hash = await bcrypt.hash(data.password.trim(), 10);
        const savedUser = await this.userRepository.add({ ...user, password: hash, username: user.username.trim().toLocaleLowerCase() })
        return plainToClass(UserDTO, savedUser);
    }

    async signIn(data: CreateUserDTO): Promise<AuthUserDTO> {
        const user = await this.getUserByName(data.username);
        const passwordMatch = bcrypt.compare(data.password, user.password)
        if(!passwordMatch) {
            throw new AuthError()
        }

        const userDto = plainToClass(UserDTO, user)
        const token = jwt.sign({username: userDto.username, id: userDto.id}, this.JWT_SECRET)
        const authUser: AuthUserDTO = {username: userDto.username, id: userDto.id, token};
        return authUser
    }
    
    async getUser(tokenValue: string) {
        const payload = await jwt.verify(tokenValue, this.JWT_SECRET);
        return payload
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.getBy({id: userId});
        if (user) {
            return user;
        } else {
            // if user does not exist by id throw error
            throw new NotFoundError('User not found')
        }
    }



    private async getUserByName(name: string): Promise<User> {
        const user = await this.userRepository.getBy({
            username: name.trim().toLocaleLowerCase()
        });
        if (user) {
            return user;
        } else {
            // if user does not exist by id throw error
            throw new NotFoundError('User not found')
        }
    }
}