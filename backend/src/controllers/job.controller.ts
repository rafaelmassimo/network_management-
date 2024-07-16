import { Request, Response } from 'express';
import connectDB from '../config/database';
import Job from '../models/job.model';
import User from '../models/user.model';

//*Get all jobs By User
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
		console.log(jobs);

		res.status(200).json(result);
	} catch (error) {
		console.log('Get jobs by user id error:', error);
		res.status(500).json({ message: 'Error getting Job by id. Please try again.' });
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
		console.log(data);

		const user = await User.findById(data.user_id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const job = new Job({
			companyName: data.companyName,
			jobInfo: {
				link: data.jobInfo.link, // Adjusted to match frontend data structure
				title: data.jobInfo.title, // Adjusted to match frontend data structure
			},
			owner: data.user_id, // Use the owner ID from the form data
			comments: data.comments,
			companyLink: data.companyLink,
			status: data.status,
			country: data.country,
			workSite: data.workSite,
		});

		await job.save();

		res.status(201).json({ message: 'Company created successfully', job });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};
