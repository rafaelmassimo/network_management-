'use client';

import React from 'react';
import Pagination from "./Pagination";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import Spinners from './Spinner';
import AlertMessage from './AlertMessage';
import { Company } from '../types/dataType';
import { CompanyStatus } from '../types/dataType';
import SearchCompanyForm from './SearchCompanyForm';
import PositionCounter from './PositionCounter';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CompanyApplication = () => {
	const { data: session } = useSession();
    const searchParams = useSearchParams();
	const companyName = searchParams.get('companyName') || '';
	const status = searchParams.get('jobStatus') || '';
	const [companies, setCompanies] = useState([]);
	const [userId, setUserId] = useState<string>('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(6); //Here you can change the number of properties to be showed per page (3, 6, 9, 12, etc.)
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);

    //>> Function to get the user ID
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

    //>> Function to get the companies by query
	useEffect(() => {
		const fetchCompanies = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/search-companies/${userId}?page=${page}&pageSize=${pageSize}&companyName=${companyName}&jobStatus=${status}`,
					{
						cache: 'no-store',
					},
				);
				if (res.status === 200) {
					const { companies, total } = await res.json();
					setCompanies(companies);
					setTotalItems(total);
				}
			} catch (error) {
				console.log('Error:', error);
			} finally {
                setLoading(false);
            }
		};
		fetchCompanies();
	}, [userId, page, pageSize, companyName, status]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
			{loading ? (
				<Spinners loading={loading} />
			) : companies.length === 0 ? (
				<div className='flex flex-col w-full items-center'>
					<Link href="/network-page" className="text-blue-500 underline mt-2 items-center">
						Return
					</Link>
					<AlertMessage sentence="You have no result" />
				</div>
			) : (
				<section className="px-4 py-6 bg-blue-50">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Search Companies</h2>
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

export default CompanyApplication;
