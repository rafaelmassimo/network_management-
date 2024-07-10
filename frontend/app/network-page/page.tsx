'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CompanyCard from '../../components/CompanyCard';
import Spinners from '../../components/Spinner';
import { Company } from '../../types/dataType';

const NetworkPage = () => {
	const [companies, setCompanies] = useState([]);
	const [userId, setUserId] = useState<string>('')
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
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/byUser/${userId}`, {
					cache: 'no-store',
				});
				if (res.status === 200) {
					const companiesData = await res.json();
					setCompanies(companiesData);
					console.log(companiesData);
					setLoading(false);
				}
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchCompanies();
	}, [userId]);

	if (loading) {
		return (
			<div>
				<Spinners loading={loading} />{' '}
			</div>
		);
	}
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
