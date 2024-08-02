'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageName from '../components/PageName';
import Spinners from '../components/Spinner';
import { CompanyStatus, JobFormType, WorkSite } from '../types/dataType';
import Swal from 'sweetalert2';
import JobsInputFields from './JobsInputFields';
import DeleteJobButton from './DeleteJobButton';

const EditJobForm = () => {
	const { data: session } = useSession();
	const { id } = useParams();
	const route = useRouter();

	const [fields, setFields] = useState<JobFormType>({
		user_id: '',
		jobId: '',
		companyName: '',
		jobInfo: { link: '', title: '' },
		comments: '',
		companyLink: '',
		status: '',
		country: '',
		workSite: '',
	});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getJobById = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/${id}`, {
					cache: 'no-store',
				});

				if (response.status === 200) {
					const job = await response.json();
					// Job ID is the _id of the job and user_id is the owner of the job that I get above
					setFields({ jobId: job._id, user_id: job.owner, ...job });
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (session?.user?.email) {
			getJobById();
		}
	}, [session]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/${fields.jobId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(fields),
			});
			if (response.status === 200) {
				console.log('Job updated successfully');
				Swal.fire('Done!', 'Job Updated successfully.', 'success');
				route.push('/applications-page');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<Spinners loading={loading} />
				</div>
			) : (
				<div className="m-4">
					{/* This is the PageName component */}
					<PageName />

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
								<option value={CompanyStatus.PositiveFeedback}>
									{CompanyStatus.PositiveFeedback}
								</option>
								<option value={CompanyStatus.Interview}>{CompanyStatus.Interview}</option>
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
									className="bg-blue-400 text-white hover:bg-blue-600 font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none"
									type="submit"
								>
									Update Job
								</button>
							</div>
						</div>
					</form>
					<DeleteJobButton jobId={fields.jobId as string} user_id={fields.user_id as string} />
				</div>
			)}
		</>
	);
};

export default EditJobForm;
