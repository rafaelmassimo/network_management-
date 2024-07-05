import express, { Request, Response } from 'express';

import { CompanyController } from '../controllers';
import connectDB from '../config/database';
import Company from '../models/company.model';
import { connect } from 'http2';

const companiesRouter = express.Router();

// Get all companies
companiesRouter.get('/', CompanyController.getCompanies);

// Get a company by id
companiesRouter.get('/:id', CompanyController.getCompanyById);

// Create a new company
companiesRouter.post('/', CompanyController.createCompany);

// Update a company status
companiesRouter.post('/:id', CompanyController.updateCompany);

export default companiesRouter;
