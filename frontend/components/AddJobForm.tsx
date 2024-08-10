'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageName from '../components/PageName';
import { CompanyStatus, JobFormType, WorkSite } from '../types/dataType';
import JobsInputFields from './JobsInputFields';
import Spinner from './Spinner';

const AddJobForm = () => {
	const { data: session } = useSession();
	const route = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [fields, setFields] = useState<JobFormType>({
		user_id: '',
		companyName: '',
		jobInfo: { link: '', title: '', description: '' },
		comments: '',
		companyLink: '',
		status: '',
		country: '',
		workSite: '',
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
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/newJob`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(fields),
			});

			if (response.status === 201) {
				console.log('Job added');
				route.push('/applications-page');
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (fields.user_id === '') return <Spinner loading={loading} />;

	return (
		<div className="m-4">
			<div>
				{/* This is the PageName component */}
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
						value={fields.status}
						onChange={(e) => setFields({ ...fields, status: e.target.value as CompanyStatus })}
					>
						<option value="" disabled>
							Choose an option
						</option>
						<option value={CompanyStatus.NoAnswer}>{CompanyStatus.NoAnswer}</option>
						<option value={CompanyStatus.PositiveFeedback}>{CompanyStatus.PositiveFeedback}</option>
						<option value={CompanyStatus.Interview}>{CompanyStatus.Interview}</option>
						<option value={CompanyStatus.Interview}>{CompanyStatus.Rejected}</option>
					</select>

					<label htmlFor="workSite" className="block my-2">
						Work Site:
					</label>
					<select
						id="workSite"
						name="workSite"
						className="border rounded w-full py-2 px-3"
						required
						value={fields.workSite}
						onChange={(e) => setFields({ ...fields, workSite: e.target.value as WorkSite })}
					>
						<option value="" disabled>
							Choose an option
						</option>
						<option value={WorkSite.InPerson}>{WorkSite.InPerson}</option>
						<option value={WorkSite.Hybrid}>{WorkSite.Hybrid}</option>
						<option value={WorkSite.Remote}>{WorkSite.Remote}</option>
						<option value={WorkSite.Other}>{WorkSite.Other}</option>
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
						onChange={(e) => setFields({ ...fields, country: e.target.value })}
					/>

					<label htmlFor="comments">Comments:</label>
					<textarea
						id="comments"
						name="comments"
						className="border rounded w-full py-2 px-3 mb-2 h-32 overflow-y-scroll"
						placeholder="Insert Comments here"
						value={fields.comments}
						onChange={(e) => setFields({ ...fields, comments: e.target.value })}
					/>

					<div>
						<button
							className="bg-blue-400 text-white hover:bg-blue-600 font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none"
							type="submit"
						>
							Add Job
						</button>

						<button
							className="bg-gray-400 text-white hover:bg-gray-600 font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none"
							onClick={() => route.push('/applications-page')}
							>
							Cancel
							</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddJobForm;
