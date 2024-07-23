'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PageName from './PageName';
import Spinner from './Spinner';

type UserType = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	picture?: string;
};

const RegisterForm = () => {
	const route = useRouter();

	const [loading, setLoading] = useState(false);
	const [checkPassword, setCheckPassword] = useState(true);
	const [userData, setUserData] = useState<UserType>({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const handleCheckPassword = () => {
		if (userData.confirmPassword === '') return;

		if (userData.password === userData.confirmPassword) {
			setCheckPassword(true);
		} else {
			setCheckPassword(false);
		}
	};

	// Function to handle the submit of the form and send the data to the database
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/createUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: userData.email,
					username: userData.username,
					password: userData.password,
					picture: userData.picture,
				}),
			});

			if (response.status === 201) {
				console.log('Job added');
				setLoading(false);

				Swal.fire({
					title: 'User Created!',
					text: 'Now you can Login!',
					icon: 'success',
				}).then(() => {
					setLoading(false);
					route.push('/api/auth/signin');
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="m-4">
			<div>
				{/* This is the PageName component */}
				<PageName />
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4 gap-2">
					<label htmlFor="companyName">User Name:</label>
					<input
						type="text"
						id="userName"
						name="userName"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert your User Name"
						required
						value={userData.username}
						onChange={(e) => setUserData({ ...userData, username: e.target.value })}
					/>

					<label htmlFor="companyLink">E-mail:</label>
					<input
						type="text"
						id="userEmail"
						name="userEmail"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Your E-mail"
						required
						value={userData.email}
						onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					/>

					<label htmlFor="password">Password: </label>
					<input
						type="password"
						id="password"
						name="password"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Your Password"
						required
						value={userData.password}
						onChange={(e) => setUserData({ ...userData, password: e.target.value })}
					/>

					<label htmlFor="confirmPassword">Confirm Password: </label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Confirm Your Password"
						required
						value={userData.confirmPassword}
						onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
						onBlur={handleCheckPassword}
					/>

					{!checkPassword && (
						<div className="flex flex-row justify-center items-center w-full border-red-300 p-2 rounded-md">
							<p className="text-center text-red-500">Passwords do not match</p>
						</div>
					)}

					<label htmlFor="images" className="block font-bold mb-2">
						Images (Select one Image)
					</label>
					<input
						type="file"
						id="images"
						name="images"
						className="border rounded w-full py-2 px-3"
						accept="image/*"
						multiple
						onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
					/>

					<div className="flex flex-col justify-center items-center">
						{loading ? (
							<div className="my-[-80px] mx-[-100px]">
								<Spinner loading={loading} />
							</div>
						) : (
							<button
								className={`${
									!checkPassword
										? 'bg-gray-400 text-white'
										: 'bg-blue-400 text-white hover:bg-blue-600'
								} font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none`}
								type="submit"
								disabled={!checkPassword ? true : false}
								style={{
									cursor: !checkPassword ? 'not-allowed' : 'pointer',
								}}
							>
								Add Job
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
