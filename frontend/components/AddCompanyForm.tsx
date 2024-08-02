'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LinkedinInputField from '../components/LinkedinInputField';
import PageName from '../components/PageName';
import Spinner from '../components/Spinner';
import { CompanyFormType, CompanyStatus } from '../types/dataType';

const AddCompanyForm = () => {
	const { data: session } = useSession();
	const route = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [fields, setFields] = useState<CompanyFormType>({
		user_id: '',
		companyName: '',
		linkedinProfiles: [''],
		comments: '',
		companyLink: '',
		image: '',
		status: CompanyStatus.NoAnswer,
		country: '',
	});

	useEffect(() => {
		const getUserId = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/getOne`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: session?.user?.email }),
				});
				if (response.status === 200) {
					const { _id } = await response.json();
					setFields({ ...fields, user_id: _id });
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (session?.user?.email) {
			getUserId();
		}
	}, [session]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/newCompany`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(fields),
			});
			if (response.status === 201) {
				console.log('Company added');
				route.push('/network-page');
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (fields.user_id === '') return <Spinner loading={loading} />;

	return (
		<div className="m-4">
			<div>
				<PageName />
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4 gap-2">
					<label htmlFor="companyName">Company Name:</label>
					<input
						type="text"
						id="companyName"
						name="companyName"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Company Name"
						required
						value={fields.companyName}
						onChange={(e) => setFields({ ...fields, companyName: e.target.value })}
					/>

					<label htmlFor="companyLink">Company Link:</label>
					<input
						type="text"
						id="companyLink"
						name="companyLink"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Company Link"
						required
						value={fields.companyLink}
						onChange={(e) => setFields({ ...fields, companyLink: e.target.value })}
					/>
					<div className="flex flex-col w-full items-center">
						<label className="text-center" htmlFor="linkedinProfiles">
							LinkedIn Profile:
						</label>
						<LinkedinInputField
							linkedinProfiles={fields.linkedinProfiles as string[]}
							setFields={setFields}
							fields={fields}
						/>
					</div>

					<label htmlFor="status" className="block  mb-2">
						Contact Status:
					</label>
					<select
						id="status"
						name="status"
						className="border rounded w-full py-2 px-3"
						required
						value={fields.status || 'empty'}
						onChange={(e) => setFields({ ...fields, status: e.target.value as CompanyStatus })}
					>
						<option value="empty" disabled>
							Choose an option
						</option>
						<option value={CompanyStatus.NoAnswer}>{CompanyStatus.NoAnswer}</option>
						<option value={CompanyStatus.PositiveFeedback}>{CompanyStatus.PositiveFeedback}</option>
						<option value={CompanyStatus.Interview}>{CompanyStatus.Interview}</option>
					</select>

					<label htmlFor="country">Country:</label>
					<input
						type="text"
						id="country"
						name="country"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Country"
						required
						value={fields.country}
						onChange={(e) => setFields({ ...fields, country: e.target.value })}
					/>

					<label htmlFor="comments">Comments:</label>
					<input
						type="text"
						id="comments"
						name="comments"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Comments here"
						value={fields.comments}
						onChange={(e) => setFields({ ...fields, comments: e.target.value })}
					/>

					{/* <label htmlFor="images" className="block font-bold mb-2">
						Images (Select one Image)
					</label>
					<input
						type="file"
						id="images"
						name="images"
						className="border rounded w-full py-2 px-3"
						accept="image/*"
						multiple
						onChange={(e) => {}}
					/> */}

					<div>
						<button
							className="bg-blue-400 text-white hover:bg-blue-600 font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none"
							type="submit"
						>
							Add Company
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddCompanyForm;
