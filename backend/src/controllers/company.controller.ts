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

export const getCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await connectDB();
        const company = await Company.findById({ _id: id });

        if (!company) return res.status(404).json({message:"Company not found"});

        res.status(200).json(company);

    } catch (error) {
        console.log('Get company by id error:', error);
        res.status(500).json({message:"Error getting company by id. Please try again."});
    }
};

export const createCompany = async (req: Request, res: Response) => {
    const data = req.body;
    const newCompany = {
        ...data,
        country: data.country.toLowerCase()
    }
	try {
		await connectDB();
		const company = new Company(newCompany)
		await company.save();

		res.status(201).json(company);
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const updateCompany = async (req: Request, res: Response) => {
    const {id} = req.params;
    // You are going to receive the newStatus in the body of the request from Front End
    const {newStatus} = req.body;

    try {
        await connectDB();
        const updatedCompany = await Company.findByIdAndUpdate(id,{status:newStatus }, {new:true} );

        if(!updatedCompany) return res.status(404).json({message: 'Company not found'});

        // Respond with the updated company
        res.status(200).json(updatedCompany);

    } catch (error) {
        console.log('Update status error:',error);
        res.status(500).json({message:'Error updating status. Please try again.'})
    }
};