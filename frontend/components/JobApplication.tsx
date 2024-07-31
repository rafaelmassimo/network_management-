'use client';

import React from 'react';
import Pagination from './Pagination';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import Spinners from './Spinner';
import SearchJobsForm from './SearchJobsForm';
import PositionCounter from './PositionCounter';
import AlertMessage from './AlertMessage';
import { CompanyStatus, JobType } from '../types/dataType';
import Link from 'next/link';

const JobApplication = () => {
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const companyName = searchParams.get('companyName') || '';
	const jobTitle = searchParams.get('jobTitle') || '';
	const country = searchParams.get('country') || '';
	const workSite = searchParams.get('workSite') || '';
	const jobStatus = searchParams.get('jobStatus') || '';
	const [jobs, setJobs] = useState<JobType[]>([]);
	const [userId, setUserId] = useState<string>('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(6); //Here you can change the number of properties to be showed per page (3, 6, 9, 12, etc.)
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);

	//>> UseEffect to get the userId
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

	//>> UseEffect to get the jobs searched
	useEffect(() => {
		const fetchJobs = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/search-jobs/${userId}
					?page=${page}&pageSize=${pageSize}&companyName=${companyName}
					&jobTitle=${jobTitle}&country=${country}&workSite=${workSite}
					&jobStatus=${jobStatus}`,
					{
						cache: 'no-store',
					},
				);
				if (res.status === 200) {
					//*My back end is retuning a 'result' object which contains the 'jobResults' and the 'total' object number of items
					const {
						result: { jobResults, total },
					} = await res.json();
					setJobs(jobResults);
					setTotalItems(total);
				}
			} catch (error) {
				console.log('Error:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchJobs();
	}, [userId, page, pageSize, companyName, jobTitle, country, workSite, jobStatus]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
			{loading ? (
				<Spinners loading={loading} />
			) : jobs.length === 0 ? (
				<div className="flex flex-col w-full items-center">
					<Link href="/applications-page" className="text-blue-500 underline mt-2 items-center">
						Return
					</Link>
					<AlertMessage sentence="You have no result" />
				</div>
			) : (
				<section className="px-4 py-6 bg-blue-50">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Result Jobs</h2>
						<PositionCounter totalItems={totalItems} text="Total Result:" />
						<SearchJobsForm />
						<Link href="/applications-page" className="text-blue-500 underline mb-2">
							Return
						</Link>
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
						<div className="flex justify-center items-center my-10">
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

export default JobApplication;
