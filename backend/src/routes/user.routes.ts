import express from 'express';
import { UserController } from '../controllers';
import { validateCreateUser } from '../../middleware/validateCreateUser';

const userRouter = express.Router();

//Get One User and pagination
userRouter.post('/getOne', UserController.getOneUser);

//Create User
userRouter.post('/createUser', validateCreateUser, UserController.createUser);

//Authenticate User
userRouter.post('/authenticate', UserController.authenticateUser);

//Ping
userRouter.get('/ping', UserController.ping);
export default userRouter;
