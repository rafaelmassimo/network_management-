'use client';

import Pagination from '@/components/Pagination';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import Spinners from '../../components/Spinner';
import { CompanyStatus, JobType, WorkSite } from '../../types/dataType';

const ApplicationsPage = () => {
	const [jobs, setJobs] = useState([]);
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
		const fetchJobs = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/byUser/${userId}?page=${page}&pageSize=${pageSize}`,
					{
						cache: 'no-store',
					},
				);
				if (res.status === 200) {
					const { jobs, total } = await res.json();
					setJobs(jobs);
					setTotalItems(total);
					setLoading(false);
				}
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchJobs();
	}, [userId, page, pageSize]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
			{loading ? (
				<Spinners loading={loading} />
			) : jobs.length === 0 ? (
				<h3 className="text-2xl font-bold text-orange-400 mt-6 text-center">
					You have no jobs yet
				</h3>
			) : (
				<section className="px-4 py-6 bg-blue-50">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Jobs</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{jobs.map((job: JobType) => (
								<div key={job._id}>
									<JobCard
										_id={job._id as string}
										companyName={job.companyName}
										companyLink={job.companyLink}
										jobInfo={job.jobInfo as any}
										comments={job.comments as string}
										status={job.status as CompanyStatus}
										country={job.country}
										updatedAt={job.updatedAt as Date}
										workSite={job.workSite as string}
									/>
								</div>
							))}
						</div>
						<Pagination
							page={page}
							pageSize={pageSize}
							totalItems={totalItems}
							onPageChange={handlePageChange}
						/>
					</div>
				</section>
			)}
		</>
	);
};

export default ApplicationsPage;
