import { Model, Schema, Types, model } from 'mongoose';

enum CompanyStatus {
	NoAnswer = 'no answer',
	PositiveFeedback = 'positive feedback',
	Interview = 'interview',
}

export type CompanyType = {
	owner: Types.ObjectId;
	id: Types.ObjectId;
	companyName: string;
	linkedinProfiles: string[];
	comments: string[];
	companyLink: string;
	image: String;
	status: CompanyStatus;
	country: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type CompanyModel = Model<CompanyType & timestamps>;

const CompanySchema = new Schema<CompanyType, CompanyModel>(
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
		linkedinProfiles: {
			type: [String],
			required: [true, 'The linkedin property is required'],
		},
		comments: {
			type: [String],
			required: [true, 'The comments property is required'],
		},
		companyLink: {
			type: String,
			required: [true, 'The companyLink property is required'],
		},
		image: {
			type: String,
			required: [true, 'The image property is required'],
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

const Company = model<CompanyType, CompanyModel>('Company', CompanySchema);

export default Company;
