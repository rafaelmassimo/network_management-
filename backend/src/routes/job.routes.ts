import express from 'express';
import { JobController } from '../controllers';
import { validateCreateUser } from '../../middleware/validateCreateUser';

// IN this file we can decide the direction and which action we are going to take inside the job controller
// and we can add a middleware to validate the user before executing the action

const jobRouter = express.Router(); // This is the router object that we are going to use to define the routes

//Create Job
jobRouter.post('/newJob', JobController.createJob); // JobController contains all the action that we can execute on the job model


export default jobRouter; // We are exporting the router object so that we can use it in the app.ts file to define the routes