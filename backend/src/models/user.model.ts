import { Model, Schema, Types, model } from 'mongoose';

export type UserTypeImported = {
	_id: Types.ObjectId;
	email: string;
	password: string | undefined;
	role?: string;
};

export type UserType = {
	id: Types.ObjectId;
	email: string;
	username: string;
	password: string;
	image: string;
	role: string;
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
		password: { type: String, required: false },
		username: {
			type: String,
			required: [true, 'Username is required'],
		},
		picture: {
			type: String,
		},
		role: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const User = model<UserType, UserModel>('User', UserSchema);

export default User;
