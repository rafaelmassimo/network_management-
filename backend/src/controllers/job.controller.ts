import { Request, Response } from 'express';
import connectDB from '../config/database';
import Job from '../models/job.model';
import User from '../models/user.model';

enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
	Rejected = 'rejected',
}

//*Get Job by ID
export const getJobById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await connectDB();
		const job = await Job.findById({ _id: id });

		if (!job) return res.status(404).json({ message: 'Job not found' });

		res.status(200).json(job);
	} catch (error) {
		console.log('Get Job by id error:', error);
		res.status(500).json({ message: 'Error getting Job by id. Please try again.' });
	}
};

//*Get all jobs By UserId
export const getJobsByUserId = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: `Invalid or missing owner ID` });

	try {
		await connectDB();

		//For Pagination
		const page = parseInt(req.query.page as string, 10) || 1;
		const pageSize = parseInt(req.query.pageSize as string, 10) || 6;

		const skip = (page - 1) * pageSize;

		const total = await Job.countDocuments({ owner: id });
		const jobs = await Job.find({ owner: id }).skip(skip).limit(pageSize).sort({ updatedAt: -1 });

		// Pagination result
		const result = {
			total,
			jobs,
		};

		res.status(200).json(result);
	} catch (error) {
		console.log('Get jobs by user id error:', error);
		res.status(500).json({ message: 'Error getting Job by id. Please try again.' });
	}
};

//*Search Jobs by Query
// Just a function to normalize strings to make sure the search is case-insensitive and whitespace-insensitive
function normalizeString(str: string): string {
	return str.replace(/\s+/g, '')
}

export const searchJobs = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: 'Invalid or missing owner ID' });

	try {
		await connectDB();
		const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
		const companyName = searchParams.get('companyName') || '';
		const jobTitle = searchParams.get('jobTitle') || '';
		const country = searchParams.get('country') || '';
		const workSite = searchParams.get('workSite') || '';
		const status = searchParams.get('jobStatus') || '';

		// For Pagination
		const page = parseInt(req.query.page as string, 10) || 1;
		const pageSize = parseInt(req.query.pageSize as string, 10) || 6;
		// Skipper
		const skip = (page - 1) * pageSize;

		// Normalize search parameters
		const normalizedCompanyName = normalizeString(companyName);
		const normalizedJobTitle = normalizeString(jobTitle);

		// Create regex patterns from normalized search parameters
		const companyNamePattern = new RegExp(normalizedCompanyName, 'i');
		const jobTitlePattern = new RegExp(normalizedJobTitle, 'i');
		const countryPattern = new RegExp(country, 'i');
		const statusPattern = new RegExp(status, 'i');
		const workSitePattern = new RegExp(workSite, 'i');

		let query = {
			owner: id,
			$and: [
				companyName ? { companyName: companyNamePattern } : {},
				jobTitle ? { 'jobInfo.title': jobTitlePattern } : {},
				country ? { country: countryPattern } : {},
				status ? { status: statusPattern } : {},
				workSite ? { workSite: workSitePattern } : {},
			],
		};

		const total = await Job.countDocuments(query);
		const jobResults = await Job.find(query).skip(skip).limit(pageSize).sort({ updatedAt: -1 });

		const result = {
			total,
			jobResults,
		};

		return res.status(200).json({ result, message: 'Jobs found successfully' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

//*Create a new job
export const createJob = async (req: Request, res: Response) => {
	const data = req.body;

	// Ensure the owner ID is provided and is valid
	if (!data.user_id) {
		return res.status(400).json({ message: 'Invalid or missing owner ID' });
	}

	try {
		await connectDB();

		const user = await User.findById(data.user_id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const job = new Job({
			companyName: data.companyName,
			jobInfo: {
				link: data.jobInfo.link, // Adjusted to match frontend data structure
				title: data.jobInfo.title, // Adjusted to match frontend data structure
				description: data.jobInfo.description, // Adjusted to match frontend data structure
			},
			owner: data.user_id, // Use the owner ID from the form data
			comments: data.comments,
			companyLink: data.companyLink,
			status: data.status,
			country: data.country,
			workSite: data.workSite,
		});

		await job.save();

		res.status(201).json({ message: 'Job created successfully', job });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

//*Update a job
export const updateJob = async (req: Request, res: Response) => {
	const { _id, ...updatedJobData } = req.body; // This contains all the fields to update

	try {
		await connectDB();
		const updatedJobResult = await Job.findByIdAndUpdate(
			_id,
			updatedJobData, // Pass the entire updatedJobData object for updating
			{ new: true }, // With { new: true }, it returns the document after the update has been applied.
		);

		if (!updatedJobResult) return res.status(404).json({ message: 'Job not found' });

		// Respond with the updated Job
		res.status(200).json(updatedJobResult);
	} catch (error) {
		console.log('Update status error:', error);
		res.status(500).json({ message: 'Error updating job. Please try again.' });
	}
};

//*Update a job Status
export const updateJobStatus = async (req: Request, res: Response) => {
	try {
		const jobId = req.params.id;
		const { status } = req.body;

		// Validate the new status against the enum
		if (!Object.values(CompanyStatus).includes(status)) {
			return res.status(400).json({ error: 'Invalid status value' });
		}
		const find = await Job.findById(jobId);
		if (!find) return res.status(404).json({ message: 'Job not found' });
		// Find the job by ID and update the status
		const updatedJob = await Job.findByIdAndUpdate(
			jobId,
			{ $set: { status: status } }, // Correctly structure the update object
			{ new: true },
		);

		if (!updatedJob) {
			return res.status(404).json({ error: 'Job not found' });
		}

		res.json(updatedJob);
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

//*Delete a job
export const deleteJob = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { user_id } = req.body;

	if (!id || !user_id)
		return res.status(400).json({ message: `Invalid or missing Job ID or User ID` });

	try {
		await connectDB();

		// Check if the user is the owner of the Job
		const jobToRemove = await Job.findOne({ _id: id });

		if (!jobToRemove) return res.status(404).json({ message: 'Job not found' });

		const isOwner = jobToRemove.owner.toString() === user_id;

		if (!isOwner) return res.status(401).json({ message: 'Unauthorized' });

		//After checking the owner, delete the company
		const jobRemoved = await Job.findByIdAndDelete({ _id: id });

		if (!jobRemoved) return res.status(404).json({ message: 'Delete job failed' });

		res.status(200).json({ message: 'Job deleted successfully', jobRemoved });
	} catch (error) {
		console.log('Get Job by id error:', error);
		res.status(500).json({ message: 'Error getting Job by id. Please try again.' });
	}
};
