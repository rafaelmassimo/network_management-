import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import companiesRouter from './routes/company.routes';
import userRouter from './routes/user.routes';
import jobRouter from './routes/job.routes';

// Start Express
const app = express();

//* Middlewares
app.use(morgan('dev'));
app.use(express.json());

// CORS
app.use(cors({ origin: '*' }));

//* Routes
app.use('/api/companies', companiesRouter);
app.use('/api/user', userRouter);
app.use('/api/jobs', jobRouter);
export default app;
