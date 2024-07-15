import { Request, Response } from 'express';
import connectDB from '../config/database';
import Job from '../models/job.model';
import User from '../models/user.model';

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
				link: data.jobInfo.jobLink, // Adjusted to match frontend data structure
				title: data.jobInfo.jobTitle, // Adjusted to match frontend data structure
			},
			owner: data.user_id, // Use the owner ID from the form data
			comments: data.comments,
			companyLink: data.companyLink,
			status: data.status,
			country: data.country,
		});

		await job.save();

		res.status(201).json({ message: 'Company created successfully', job });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};
