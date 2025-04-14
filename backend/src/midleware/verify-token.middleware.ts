import { NextFunction, Request, Response } from "express";
import { ICrudeRepository } from "../interfaces/ICrudeRespository";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { UserInteractor } from "../interactors/userInteractor";
import { IUserInteractor } from "../interfaces/IUserInteractor";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { Container } from "inversify";

const container = new Container();
container.bind<ICrudeRepository<User>>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);

const userInteractor = container.get<UserInteractor>(INTERFACE_TYPE.UserInteractor);

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const tokenValue = token.split(' ')[1];

    try {
        const data: any = await userInteractor.getUser(tokenValue);
        req.headers['x-user-id']=data.id;
        
        next()
    } catch (error: any) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };