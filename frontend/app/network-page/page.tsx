'use client';

import React from 'react';
import Pagination from '@/components/Pagination';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CompanyCard from '../../components/CompanyCard';
import Spinners from '../../components/Spinner';
import PositionCounter from '../../components/PositionCounter';
import SearchCompanyForm from '../../components/SearchCompanyForm';
import AlertMessage from '../../components/AlertMessage';
import { Company } from '../../types/dataType';
import { CompanyStatus } from '../../types/dataType';

const NetworkPage = () => {
	const [companies, setCompanies] = useState([]);
	const [userId, setUserId] = useState<string>('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(6); //Here you can change the number of properties to be showed per page (3, 6, 9, 12, etc.)
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);
	const { data: session } = useSession();

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
					setUserId(_id);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (session?.user?.email) {
			getUserId();
		}
	}, [session]);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/byUser/${userId}?page=${page}&pageSize=${pageSize}`,
					{
						cache: 'no-store',
					},
				);
				if (res.status === 200) {
					const { companies, total } = await res.json();
					setCompanies(companies);
					setTotalItems(total);
					setLoading(false);
				}
			} catch (error) {
				console.log('Error:', error);
			} 
		};
		fetchCompanies();
	}, [userId, page, pageSize]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
			{loading ? (
				<Spinners loading={loading} />
			) : companies.length === 0 ? (
				<AlertMessage sentence="You have no companies yet." />
			) : (
				<section className="px-4 py-6 bg-blue-50 min-h-screen overflow-hidden">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Companies</h2>
						<PositionCounter totalItems={totalItems} text='Total Companies:' />
						<SearchCompanyForm/>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{companies.map((company: Company) => (
								<div key={company._id}>
									<CompanyCard
										id={company._id}
										companyName={company.companyName}
										companyLink={company.companyLink}
										linkedin={company.linkedinProfiles}
										comments={company.comments as string}
										status={company.status as CompanyStatus}
									/>
								</div>
							))}
						</div>
						<div className='bg-white'>

						<Pagination
							page={page}
							pageSize={pageSize}
							totalItems={totalItems}
							onPageChange={handlePageChange}
							/>
							</div>
					</div>
				</section>
			)}
		</>
	);
};

export default NetworkPage;
