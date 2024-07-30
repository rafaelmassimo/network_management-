import { Request, Response } from 'express';
import connectDB from '../config/database';
import Company from '../models/company.model';
import { CompanyStatus } from '../models/company.model';

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

		if (!company) return res.status(404).json({ message: 'Company not found' });

		res.status(200).json(company);
	} catch (error) {
		console.log('Get company by id error:', error);
		res.status(500).json({ message: 'Error getting company by id. Please try again.' });
	}
};

export const getCompaniesByUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: `Invalid or missing owner ID` });

	try {
		await connectDB();

		//For Pagination
		const page = parseInt(req.query.page as string, 10) || 1;
		const pageSize = parseInt(req.query.pageSize as string, 10) || 6;

		const skip = (page - 1) * pageSize;

		const total = await Company.countDocuments({ owner: id });
		const companies = await Company.find({ owner: id })
			.skip(skip)
			.limit(pageSize)
			.sort({ updatedAt: -1 });

		// Pagination result
		const result = {
			total,
			companies,
		};

		res.status(200).json(result);
	} catch (error) {
		console.log('Get companies by user id error:', error);
		res.status(500).json({ message: 'Error getting company by id. Please try again.' });
	}
};

//*Search Jobs by Query
// Just a function to normalize strings to make sure the search is case-insensitive and whitespace-insensitive
function normalizeString(str: string): string {
	return str.replace(/\s+/g, '');
}
export const searchCompanies = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: 'Invalid or missing owner ID' });

	try {
		await connectDB();
		const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
		const companyName = searchParams.get('companyName') || '';
		const status = searchParams.get('jobStatus') || '';

		// For Pagination
		const page = parseInt(req.query.page as string, 10) || 1;
		const pageSize = parseInt(req.query.pageSize as string, 10) || 6;
		// Skipper
		const skip = (page - 1) * pageSize;

		// Normalize search parameters
		const normalizedCompanyName = normalizeString(companyName);

		// Create regex patterns from normalized search parameters
		const companyNamePattern = new RegExp(normalizedCompanyName, 'i');
		const statusPattern = new RegExp(status, 'i');

		let query = {
			owner: id,
			$and: [
				companyName ? { companyName: companyNamePattern } : {},
				status ? { status: statusPattern } : {},
			],
		};

		const total = await Company.countDocuments(query);
		const companies = await Company.find(query).skip(skip).limit(pageSize).sort({ updatedAt: -1 });

		const result = {
			total,
			companies,
		};
		console.log(result);

		return res.status(200).json({ companies, total, message: 'Jobs found successfully' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

export const createCompany = async (req: Request, res: Response) => {
	const data = req.body;

	// Ensure the owner ID is provided and is valid
	if (!data.user_id) {
		return res.status(400).json({ message: 'Invalid or missing owner ID' });
	}

	try {
		await connectDB();

		// Optionally, validate the owner exists in the User collection here
		// For example, using User.findById(data.owner)

		const company = new Company({
			...data,
			owner: data.user_id, // Use the owner ID from the form data
		});

		await company.save();

		res.status(201).json({ message: 'Company created successfully', company });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

export const updateCompany = async (req: Request, res: Response) => {
	const { _id, ...updatedCompanyData } = req.body; // This contains all the fields to update

	try {
		await connectDB();
		const updatedCompanyResult = await Company.findByIdAndUpdate(
			_id,
			updatedCompanyData, // Pass the entire updatedCompanyData object for updating
			{ new: true }, // With { new: true }, it returns the document after the update has been applied.
		);

		if (!updatedCompanyResult) return res.status(404).json({ message: 'Company not found' });

		// Respond with the updated company
		res.status(200).json(updatedCompanyResult);
	} catch (error) {
		console.log('Update status error:', error);
		res.status(500).json({ message: 'Error updating company. Please try again.' });
	}
};

//*Update a company Status
export const updateCompanyStatus = async (req: Request, res: Response) => {
	try {
		const companyId = req.params.id;
		const { status } = req.body;

		// Validate the new status against the enum
		if (!Object.values(CompanyStatus).includes(status)) {
			return res.status(400).json({ error: 'Invalid status value' });
		}
		const find = await Company.findById(companyId);
		if (!find) return res.status(404).json({ message: 'Company not found' });
		// Find the company by ID and update the status
		const updatedCompany = await Company.findByIdAndUpdate(
			companyId,
			{ $set: { status: status } }, // Correctly structure the update object
			{ new: true },
		);

		if (!updatedCompany) {
			return res.status(404).json({ error: 'Company not found' });
		}

		res.json(updatedCompany);
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

export const deleteCompany = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { user_id } = req.body;

	if (!id || !user_id)
		return res.status(400).json({ message: `Invalid or missing company ID or User ID` });

	try {
		await connectDB();

		// Check if the user is the owner of the company
		const companyToRemove = await Company.findOne({ _id: id });

		if (!companyToRemove) return res.status(404).json({ message: 'Company not found' });

		const isOwner = companyToRemove.owner.toString() === user_id;

		if (!isOwner) return res.status(401).json({ message: 'Unauthorized' });

		//After checking the owner, delete the company
		const companyRemoved = await Company.findByIdAndDelete({ _id: id });

		if (!companyRemoved) return res.status(404).json({ message: 'Dele Company failed' });

		res.status(200).json({ message: 'Company deleted successfully', companyRemoved });
	} catch (error) {
		console.log('Get company by id error:', error);
		res.status(500).json({ message: 'Error getting company by id. Please try again.' });
	}
};
