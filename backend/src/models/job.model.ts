import { Model, Schema, Types, model } from 'mongoose';

enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
}

enum WorkSite {
	InPerson = 'in person',
	Hybrid = 'hybrid',
	Remote = 'remote',
	Other = 'other',
}

export type JobType = {
	owner: Types.ObjectId;
	id: Types.ObjectId;
	companyName: string;
	companyLink: string;
	jobInfo: { link: string; title: string };
	country: string;
	comments: string;
	status: CompanyStatus;
	workSite: WorkSite;
};

type Timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type JobModel = Model<JobType & Timestamps>;

const JobInfoSchema = new Schema(
	{
		link: {
			type: String,
			required: [true, 'The link job is required'],
		},
		title: {
			type: String,
			required: [true, 'The title job is required'],
		},
	},
	{ _id: false }, // Prevents Mongoose from creating an _id for sub-documents
);

const JobSchema = new Schema<JobType, JobModel>(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'The owner job is required'],
		},
		companyName: {
			type: String,
			required: [true, 'The companyName job is required'],
		},
		jobInfo: {
			type: JobInfoSchema,
			required: true,
		},
		comments: {
			type: String,
		},
		companyLink: {
			type: String,
		},
		status: {
			type: String,
			enum: Object.values(CompanyStatus),
			default: CompanyStatus.NoAnswer, // Set the default status as no answer
		},
		country: {
			type: String,
			required: [true, 'The country property is required'],
		},
		workSite: {
			type: String,
			enum: Object.values(WorkSite),
			default: WorkSite.Other,
		},
	},
	{ timestamps: true },
);

const Job = model<JobType, JobModel>('Job', JobSchema);

export default Job;
