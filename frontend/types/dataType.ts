import { Types } from 'mongoose';

export interface Company {
	id: number;
	companyName: string;
	linkedin: string[];
	comments: string | string[];
}
export interface CompanyCardProps {
	id: number;
	companyName: string;
	linkedin: string[];
	comments: string[];
}

export interface CommentsProps {
	comments: string[];
}

export interface LinkedinProps {
	linkedin: string[];
}

export type UserTypeImported = {
	_id: Types.ObjectId;
	email: string;
	password: string | undefined;
	role?: string;
};

export type UserLoggedIn = {
	_id: string;
	email: string;
	username: string;
	picture: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	role: string;
};
