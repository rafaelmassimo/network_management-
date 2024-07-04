import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import connectDB from '../config/database';
import User, { UserTypeImported } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
	const userData = req.body;

	try {
		await connectDB(); // This is the function from src/config/database.ts
		//Confirm data exist
		if (!userData.email || !userData.password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		// Check if user already exists
		const duplicatedUser = await User.findOne({ email: userData.email }).lean().exec();

		if (duplicatedUser) {
			return res.status(409).json({ message: 'User already exists' });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;

		await User.create(userData);
		return res.status(201).json({ message: 'User created successfully', newUser: userData });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error creating user. Please try again later.', error });
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

export const authenticateUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	try {
		await connectDB(); // This is the function from src/config/database.ts
		const foundUser = (await User.findOne({ email: email })
			.lean()
			.exec()) as UserTypeImported | null;
			console.log('Found User:', foundUser);
			

		if (!foundUser) {
			return res.status(401).send('Authentication failed');
		}

		const match = await bcrypt.compare(password, foundUser.password!);

		if (match) {
			// Remove the password from the user object before returning it
			delete foundUser.password;
			foundUser['role'] = 'Unverified User'; // Add or adjust additional properties as needed

			return res.json(foundUser);
		} else {
			return res.status(401).send('Authentication failed');
		}
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).send('Internal server error');
	}
};
