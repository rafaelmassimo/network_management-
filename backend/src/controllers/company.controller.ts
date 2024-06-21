import { Request, Response } from 'express';
import connectDB from '../config/database';
import Company from '../models/company.model';

export const getCompanies = async (req: Request, res: Response) => {
	try {
		await connectDB(); // This is the function from src/config/database.ts

		const companies = await Company.find({});

		res.status(200).json(companies);
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const createCompany = async (req: Request, res: Response) => {
	try {
		await connectDB();
		const companyData = {
			owner: 'a1b2c3d4e5f67890abcdef12',
			companyName: 'test',
			linkedin: ['test'],
			comments: ['test'],
			companyLink: 'test',
			image: 'test',
		};
		const company = new Company(companyData);
		await company.save();

		res.status(201).json(company);
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
