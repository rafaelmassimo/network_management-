import { Types } from 'mongoose';

export type CompanyFormType = {
	user_id: string;
	companyId?: string;
	companyName: string;
	linkedinProfiles: string[];
	comments: string[] | string;
	companyLink: string;
	image: string;
	status: CompanyStatus;
	country: string;
};

export type JobFormType = {
	user_id: string;
	jobId?: string;
	companyName: string;
	jobsLinks: JobObjectType;
	comments: string;
	companyLink: string;
	status: CompanyStatus;
	country: string;
};

export type JobObjectType = {
	jobLink: string;
	jobTitle: string;
}

export enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
}

export interface Company {
	owner: Types.ObjectId;
	_id: string;
	companyName: string;
	linkedinProfiles: string[];
	comments: string[];
	companyLink: string;
	image: String;
	status: CompanyStatus;
	country: string;
}

export interface CompanyCardProps {
	id: string;
	companyName: string;
	companyLink: string;
	linkedin: string[];
	comments: string[];
}

export interface CommentsProps {
	comments: string[];
}

export interface LinkedinProps {
	linkedin: string[];
}

export interface JobProps {
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
