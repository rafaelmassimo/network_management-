import { Model, Schema, Types, model } from 'mongoose';

export type CompanyType = {
	owner: Types.ObjectId;
	id: Types.ObjectId;
	companyName: string;
	linkedin: string[];
	comments: string[];
	companyLink: string;
	image: String;
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
			required: true,
		},
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
		image: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true },
);

const Company = model<CompanyType, CompanyModel>('Company', CompanySchema);

export default Company;
