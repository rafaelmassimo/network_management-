import { Model, Schema, Types, model } from 'mongoose';

enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
}

export type JobType = {
	owner: Types.ObjectId;
	id: Types.ObjectId;
	companyName: string;
	companyLink: string;
	jobsLinks: [{ link: string; title: string }];
	country: string;
	comments: string;
	status: CompanyStatus;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type JobModel = Model<JobType & timestamps>;

const JobSchema = new Schema<JobType, JobModel>(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'The owner property is required'],
		},
		companyName: {
			type: String,
			required: [true, 'The companyName property is required'],
		},
		jobsLinks: {
			type: [
				{
					link: {
						type: String,
						required: [true, 'The link property is required'],
					},
					title: {
						type: String,
						required: [true, 'The title property is required'],
					},
				},
			],
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
	},
	{ timestamps: true },
);

const Job = model<JobType, JobModel>('Job', JobSchema);

export default Job;
