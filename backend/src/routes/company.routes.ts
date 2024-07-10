import express from 'express';

import connectDB from '../config/database';
import { CompanyController } from '../controllers';
import Company from '../models/company.model';

const companiesRouter = express.Router();

// Get all companies
companiesRouter.get('/', CompanyController.getCompanies);

//Get all companies by user id
companiesRouter.get('/byUser/:id', CompanyController.getCompaniesByUser);

// Get a company by id
companiesRouter.get('/:id', CompanyController.getCompanyById);

// Create a new company
companiesRouter.post('/newCompany', CompanyController.createCompany);

// Update a company status
companiesRouter.post('/:id', CompanyController.updateCompany);

export default companiesRouter;
