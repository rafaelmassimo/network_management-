import { NextFunction, Request, Response } from 'express';

export const validateCreateUser = (
	req: Request<{}, {}, { email?: string; password?: string }>,
	res: Response,
	next: NextFunction,
) => {
	// TODO: look into express validator
	const { email, password } = req.body;

	if (!email) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	next();
};


