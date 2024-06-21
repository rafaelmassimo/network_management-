import { Request, Response } from 'express';
import connectDB from '../config/database';
import User from '../models/user.model';

export const checkUser = async (req: Request, res: Response) => {
	const { email, username, picture } = req.body;

	try {
		await connectDB(); // This is the function from src/config/database.ts
		let user = await User.findOne({ email });

		if (!user) {
			user = new User({ email, username, picture });
			await user.save();
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const getOneUser = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		await connectDB(); // This is the function from src/config/database.ts

		const user = await User.findOne({ email });

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
