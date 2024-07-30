'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CompanyStatus } from '../types/dataType';

const SearchCompanyForm = () => {
	const [companyName, setCompanyName] = useState<string>('');
	const [jobStatus, setJobStatus] = useState<CompanyStatus | ''>('');


	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (companyName === '' && jobStatus === '') {
			router.push(`/network-page`);
		} else {
			const query = `?companyName=${companyName}&jobStatus=${jobStatus}
			`;
			router.push(`/network-page/search-companies${query}`);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="mt-3 mx-auto  w-4/5 flex flex-col md:flex-row items-center mb-4"
		>
			<div className="w-full md:w-3/4 md:pr-2 mb-4 md:mb-0">
				<label htmlFor="companyName" className="sr-only">
					Company Name:
				</label>
				<input
					type="text"
					id="companyName"
					placeholder="Insert Company Name"
					value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>

			<div className="w-full md:w-1/4 md:pl-2">
				<label htmlFor="jobStatus" className="sr-only">
					Job Status:
				</label>
				<select
					id="jobStatus"
					value={jobStatus}
					onChange={(e) => setJobStatus(e.target.value as CompanyStatus)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				>
					<option value="">Select Job Status</option>
					{Object.values(CompanyStatus).map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>
			<button
				type="submit"
				className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-teal-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
			>
				Search
			</button>
		</form>
	);
};

export default SearchCompanyForm;
