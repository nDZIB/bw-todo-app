import { Request, Router, Response, NextFunction } from 'express'
import { Container } from 'inversify';
import { INTERFACE_TYPE } from '../utils/app.constant';
import { ICrudeRepository } from '../interfaces/ICrudeRespository';
import { validate } from '../midleware/validate.middleware';
import { userSchema } from '../dto/validation/user.schema';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserController } from '../controllers/user.controller';
import { UserInteractor } from '../interactors/userInteractor';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

// setup D/I with inversify
const container = new Container();
container.bind<ICrudeRepository<User>>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);
container.bind(INTERFACE_TYPE.UserController).to(UserController);

const userController = container.get<UserController>(INTERFACE_TYPE.UserController);

const authRouter: Router = Router();

authRouter.post('/sign-up', validate(userSchema), async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await userController.onSignUp(req.body);
        resp.status(201).json(responseData)
    } catch (error) {
        next(error)
    }
})

authRouter.post('/sign-in', validate(userSchema), async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const responseData = await userController.onSignIn(req.body);
        resp.status(201).json(responseData)
    } catch (error) {
        next(error)
    }
})


export default authRouter;