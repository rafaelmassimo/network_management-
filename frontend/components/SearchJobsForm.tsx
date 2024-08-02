'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CompanyStatus, WorkSite } from '@/types/dataType';

const SearchJobForm = () => {
	const [companyName, setCompanyName] = useState<string>('');
	const [jobTitle, setJobTitle] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [jobStatus, setJobStatus] = useState<CompanyStatus | ''>('');
	const [workSite, setWorkSite] = useState<WorkSite | ''>('');

	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (companyName === '' && jobTitle === '' && country === '' && workSite === '' && jobStatus === '') {
			router.push(`/applications-page`);
		} else {
			const query = `?companyName=${companyName}&jobTitle=${jobTitle}
			&country=${country}
			&workSite=${workSite}
			&jobStatus=${jobStatus}
			`;
			router.push(`/applications-page/search-results${query}`);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="mt-3 mx-auto w-full flex flex-col md:flex-row items-center mb-4"
		>
			<div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
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
			<div className="w-full md:w-2/5 md:pl-2">
				<label htmlFor="jobTitle" className="sr-only">
					Job Title:
				</label>
				<input
					type="text"
					id="jobTitle"
					placeholder="Insert Job Title"
					value={jobTitle}
					onChange={(e) => setJobTitle(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>

			<div className="w-full md:w-2/5 md:pl-2">
				<label htmlFor="country" className="sr-only">
					Country:
				</label>
				<input
					type="text"
					id="country"
					placeholder="Insert Country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>

			<div className="w-full md:w-2/5 md:pl-2">
				<label htmlFor="workSite" className="sr-only">
					Work Site:
				</label>
				<select
					id="workSite"
					value={workSite}
					onChange={(e) => setWorkSite(e.target.value as WorkSite)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				>
					<option value="">Select Work Site</option>
					{Object.values(WorkSite).map((site) => (
						<option key={site} value={site}>
							{site}
						</option>
					))}
				</select>
			</div>

			<div className="w-full md:w-2/5 md:pl-2">
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

export default SearchJobForm;
