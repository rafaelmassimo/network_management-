import express from 'express';
import { UserController } from '../controllers';
import User, { UserTypeImported } from '../models/user.model';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';


const userRouter = express.Router();

//Get One User
userRouter.post('/getOne', UserController.getOneUser);

//Create User
userRouter.post('/createUser', UserController.createUser);

//Authenticate User
userRouter.post('/authenticate',UserController.authenticateUser);



export default userRouter;
