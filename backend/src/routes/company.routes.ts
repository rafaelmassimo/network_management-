import express from 'express';
import {CompanyController} from "../controllers"

const companiesRouter = express.Router();

companiesRouter.get('/', CompanyController.getCompanies);
companiesRouter.post('/', CompanyController.createCompany);


export default companiesRouter;