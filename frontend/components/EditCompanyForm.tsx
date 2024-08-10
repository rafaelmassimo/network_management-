'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeleteCompanyButton from '../components/DeleteCompanyButton';
import PageName from '../components/PageName';
import Spinners from '../components/Spinner';
import { CompanyFormType, CompanyStatus } from '../types/dataType';
import LinkedinInputField from './LinkedinInputField';
import Swal from 'sweetalert2';

const EditCompanyForm = () => {
	const { data: session } = useSession();
	const { id } = useParams();
	const route = useRouter();

	const [fields, setFields] = useState<CompanyFormType>({
		user_id: '',
		companyId: '',
		companyName: '',
		linkedinProfiles: [''],
		comments: [''],
		companyLink: '',
		image: '',
		status: CompanyStatus.NoAnswer,
		country: '',
	});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getCompanyById = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/${id}`, {
					cache: 'no-store',
				});

				if (response.status === 200) {
					const company = await response.json();
					setFields({ companyId: company._id, user_id: company.owner, ...company });
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (session?.user?.email) {
			getCompanyById();
		}
	}, [session]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/${fields.companyId}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(fields),
				},
			);
			if (response.status === 200) {
				console.log('Company updated successfully');
				Swal.fire('Done!', 'Company Updated successfully.', 'success');
				route.push('/network-page');
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

							<div className="flex flex-col w-full gap-2">
								<label className="text-center" htmlFor="linkedinProfiles">
									LinkedIn Profile:
								</label>
								<LinkedinInputField
									linkedinProfiles={fields.linkedinProfiles as string[]}
									setFields={setFields}
									fields={fields}
								/>
							</div>

							<label htmlFor="status" className="block text-gray-700 font-bold mb-2">
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
								<option value={CompanyStatus.PositiveFeedback}>
									{CompanyStatus.PositiveFeedback}
								</option>
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
							<textarea
								id="comments"
								name="comments"
								className="border rounded w-full py-2 px-3 mb-2 h-32 overflow-y-scroll"
								placeholder="Insert Comments here"
								value={fields.comments}
								onChange={(e) => setFields({ ...fields, comments: e.target.value })}
							/>

							{/* <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
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

							<div className="flex flex-row my-4 gap-5">
								<button
									className="bg-blue-400 text-white hover:bg-blue-600 font-bold py-2 px-4 shadow-xl rounded-full w-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none"
									type="submit"
								>
									Update Company
								</button>
							</div>
						</div>
					</form>
					<div className='flex flex-col items-center'>
						<DeleteCompanyButton companyId={fields.companyId as string} user_id={fields.user_id} />
						<button
							className="bg-gray-400 text-white items-center hover:bg-gray-600 font-bold py-2 px-4  shadow-xl rounded-full w-fit focus:outline-none mt-5 transition duration-100 focus:translate-y-1 focus:shadow-none"
							onClick={() => route.push('/network-page')}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default EditCompanyForm;
