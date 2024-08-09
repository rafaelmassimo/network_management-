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
	user_id?: string;
	jobId?: string;
	companyName: string;
	jobInfo: JobObjectType;
	comments: string;
	companyLink: string;
	status: CompanyStatus | string;
	country: string;
	updatedAt?: Date;
	workSite: WorkSite | string;
};

export type JobObjectType = {
	link: string;
	title: string;
	description?: string;
}

export enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
	Rejected = 'rejected',
}

export interface Company {
	owner: Types.ObjectId;
	_id: string;
	companyName: string;
	linkedinProfiles: string[];
	comments: string;
	companyLink: string;
	image: String;
	status: CompanyStatus;
	country: string;
}

export enum WorkSite {
	InPerson = 'in person',
	Hybrid = 'hybrid',
	Remote = 'remote',
	Other = 'other',
}

export type JobType = {
    owner?: Types.ObjectId; // I added the question mark just to make the job card stop complaining about the owner being undefined
    _id: string;
    companyName: string;
    companyLink: string;
    jobInfo: { link: string; title: string; description: string };
    country: string;
    comments: string;
    status: CompanyStatus | string;
	updatedAt: Date;
	workSite: WorkSite | string;
};

export interface CompanyCardProps {
	id: string;
	companyName: string;
	companyLink: string;
	linkedin: string[];
	comments: string;
	status: CompanyStatus;
}

export interface CommentsProps {
	comments: string;
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
