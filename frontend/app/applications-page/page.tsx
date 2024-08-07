'use client';

import React from 'react';
import Pagination from '../../components/Pagination';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import Spinners from '../../components/Spinner';
import SearchJobsForm from '../../components/SearchJobsForm';
import AlertMessage from '../../components/AlertMessage';
import PositionCounter from '../../components/PositionCounter';
import { CompanyStatus, JobType } from '../../types/dataType';
import AddElementButton from '@/components/AddElementButton';

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
				<div className='flex flex-col justify-start items-center h-screen'>

				<AlertMessage sentence="You have not applied for any job yet." />
				<AddElementButton text='Add a first job' path='/add-job' />
				</div>
			) : (
				<section className="px-4 py-6 bg-blue-50 min-h-screen">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Jobs</h2>
						<PositionCounter totalItems={totalItems} text='Total Positions Applied:' />
						<div className="flex flex-row items-center grid-cols-2 w-full">
							<div className="">
								<SearchJobsForm />
							</div>
							<div className='ml-7 w-1/6'>
								<AddElementButton text="New Job" path="/add-job" />
							</div>
						</div>
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
						
					</div>
					<div className='flex justify-center items-center my-10'>
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
