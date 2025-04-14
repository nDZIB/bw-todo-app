import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserInteractor } from "../interfaces/IUserInteractor";

@injectable()
@Tags('Auth')
@Route('api/v1/auth')
export class UserController extends Controller {
    private userInteractor: IUserInteractor;

    constructor(@inject(INTERFACE_TYPE.UserInteractor) userInteractor: IUserInteractor) {
        super()
        this.userInteractor = userInteractor;
    }

    @Post('/sign-up')
    @SuccessResponse('201', 'Created')
    async onSignUp(@Body() data: CreateUserDTO) {
        try {
            const responseData = await this.userInteractor.addUser(data);
            return responseData
        } catch (error) {
            throw error;
        }
    }

    @Post('/sign-in')
    @SuccessResponse('201', 'Created')
    async onSignIn(@Body() data: CreateUserDTO) {
        try {
            const responseData = await this.userInteractor.signIn(data);
            return responseData
        } catch (error) {
            throw error;
        }
    }
}