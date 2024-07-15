'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageName from '../components/PageName';
import { CompanyStatus, JobFormType } from '../types/dataType';
import JobsInputFields from './JobsInputFields';

const AddJobForm = () => {
	const { data: session } = useSession();
	const route = useRouter();
	const [fields, setFields] = useState<JobFormType>({
		user_id: '',
		companyName: '',
		jobsLinks: { jobLink: '', jobTitle: '' },
		comments: '',
		companyLink: '',
		status: CompanyStatus.NoAnswer,
		country: '',
	});

	// Get the user id from the database and set it in the fields object
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
			}
		};
		if (session?.user?.email) {
			getUserId();
		}
	}, [session]);

	// Function to handle the submit of the form and send the data to the database
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


	return (
		<div className="m-4">
			<div>
				<PageName />
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4">
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
					{/* // Component to display all the job links */}
					<JobsInputFields fields={fields} setFields={setFields} />

					<label htmlFor="status" className="block my-2">
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

					<label className="mt-2" htmlFor="country">
						Country:
					</label>
					<input
						type="text"
						id="country"
						name="country"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert Country"
						required
						value={fields.country}
						onChange={(e) => setFields({ ...fields, country: e.target.value.toLowerCase() })}
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

					<div>
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-3"
							type="submit"
						>
							Add Job
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddJobForm;
