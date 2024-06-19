import { Model, Schema, Types, model } from 'mongoose';

export type CompanyType = {
	id: Types.ObjectId;
	companyName: string;
	linkedin: string[];
	comments: string[];
	companyLink: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type CompanyModel = Model<CompanyType & timestamps>;

const CompanySchema = new Schema<CompanyType, CompanyModel>(
	{
		companyName: {
			type: String,
			required: true,
		},
		linkedin: {
			type: [String],
			required: true,
		},
		comments: {
			type: [String],
			required: true,
		},
		companyLink: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Company = model<CompanyType, CompanyModel>('Company', CompanySchema);

export default Company;
