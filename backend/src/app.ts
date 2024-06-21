import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import companiesRouter from './routes/company.routes';
import userRouter from './routes/user.routes';

// Start Express
const app = express();

//* Middlewares
app.use(express.json());

// CORS
app.use(cors({ origin: '*' }));

//* Routes
app.use('/api/company', companiesRouter);
app.use('/api/user', userRouter);
export default app;


