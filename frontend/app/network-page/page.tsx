'use client';

import React, { useEffect, useState } from 'react';
import CompanyCard from '../../components/CompanyCard';
import data from '../../data.json';
import { Company } from '../../types/dataType';

const NetworkPage = () => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies`);
				if (res.status === 200) {
					const companiesData = await res.json();
					setCompanies(companiesData);
					console.log(companiesData);
					
				}
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchCompanies();
	}, []);

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Companies</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{companies.slice(0, 30).map((company: Company) => (
						<div key={company._id}>
							<CompanyCard
								id={company._id}
								companyName={company.companyName}
								linkedin={company.linkedinProfiles}
								comments={company.comments as string[]}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default NetworkPage;
