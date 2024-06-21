import { Model, Schema, Types, model } from 'mongoose';

export type UserType = {
	id: Types.ObjectId;
	email: string;
	username: string;
	image: string;
	companyLink: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type UserModel = Model<UserType & timestamps>;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, 'Email already Exists'],
			required: [true, 'Email is required'],
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const User = model<UserType, UserModel>('User', UserSchema);

export default User;
