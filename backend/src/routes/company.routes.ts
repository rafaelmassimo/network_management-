import express from 'express';

import { CompanyController } from '../controllers';

const companiesRouter = express.Router();

//* Get all companies
companiesRouter.get('/', CompanyController.getCompanies);

//* Get all companies by user id
companiesRouter.get('/byUser/:id', CompanyController.getCompaniesByUser);

//* Get a company by id
companiesRouter.get('/:id', CompanyController.getCompanyById);

//* Create a new company
companiesRouter.post('/newCompany', CompanyController.createCompany);

//* Update a company 
companiesRouter.post('/:id', CompanyController.updateCompany);

//* Update Job Status By ID
companiesRouter.post('/status/:id', CompanyController.updateCompanyStatus);

//* Delete a company
companiesRouter.delete('/:id', CompanyController.deleteCompany)

export default companiesRouter;
