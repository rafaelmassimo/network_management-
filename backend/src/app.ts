import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import companiesRouter from './routes/company.routes';

// Start Express
const app = express();

//* Middlewares
app.use(express.json());

// CORS
app.use(cors({ origin: '*' }));

app.use('/api/company', companiesRouter);

export default app;
