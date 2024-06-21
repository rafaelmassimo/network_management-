import express, { Request, Response } from 'express';
import { UserController } from '../controllers';

const userRouter = express.Router();

//Get One User
userRouter.get('/getOne', UserController.getOneUser);

//Check if user exists if not create one
userRouter.post('/checkUser', UserController.checkUser);

export default userRouter;
