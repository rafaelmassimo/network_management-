'use client';
import { IoIosRadioButtonOn } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DashboardCard from '../../components/DashboardCard';
import CountriesDashBoard from '../../components/CountriesDashBoard';
import Spinners from '../../components/Spinner';
import { JobFormType } from '@/types/dataType';
import { IoIosTime } from 'react-icons/io';
import { BiLike } from 'react-icons/bi';
import { BsPersonArmsUp } from 'react-icons/bs';
import { GiSpaceShuttle } from 'react-icons/gi';

type CountryType = {
	country: string;
	amount: number;
};

const DashboardPage = () => {
	const [jobs, setJobs] = useState<{ status: string }[]>([]);
	const [userId, setUserId] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const { data: session } = useSession();
	const [jobNumbers, setJobNumbers] = useState({
		noAnswer: {
			percentage: 0,
			amount: 0,
		},
		positiveFeedback: {
			percentage: 0,
			amount: 0,
		},
		rejected: {
			percentage: 0,
			amount: 0,
		},
		interview: {
			percentage: 0,
			amount: 0,
		},
	});
	const [countryData, setCountryData] = useState([{ country: '', amount: 0 }]);

	//>> In this UseEffect, we are fetching the user and jobs data from the API and setting the state percentages of the job status to use on the dashboard cards
	useEffect(() => {
		const fetchUserAndJobs = async () => {
			try {
				if (session?.user?.email) {
					//* First Get the user ID
					const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/getOne`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email: session?.user?.email }),
					});
					if (userResponse.status === 200) {
						const { _id } = await userResponse.json();
						setUserId(_id);

						//* Then get the jobs
						const jobsResponse = await fetch(
							`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/allByUser/${userId}`,
							{
								cache: 'no-store',
							},
						);
						if (jobsResponse.status === 200) {
							const jobs = await jobsResponse.json();
							setJobs(jobs);
							setLoading(false);

							//* Now calculate the job status
							const noAnswer = jobs.filter((job: JobFormType) => job.status === 'no answer').length;
							const positiveFeedback = jobs.filter(
								(job: JobFormType) => job.status === 'positive feedback',
							).length;
							const rejected = jobs.filter((job: JobFormType) => job.status === 'rejected').length;
							const interview = jobs.filter(
								(job: JobFormType) => job.status === 'interview',
							).length;

							setJobNumbers(prevJobNumbers => ({
								...prevJobNumbers,
								noAnswer: {
									...prevJobNumbers.noAnswer,
									amount: noAnswer,
								},
								positiveFeedback: {
									...prevJobNumbers.positiveFeedback,
									amount: positiveFeedback,
								},
								rejected: {
									...prevJobNumbers.rejected,
									amount: rejected,
								},
								interview: {
									...prevJobNumbers.interview,
									amount: interview,
								},
							}));

							const noAnswerPercentage = (noAnswer * 100) / jobs.length;
							const positiveFeedbackPercentage = (positiveFeedback * 100) / jobs.length;
							const rejectedPercentage = (rejected * 100) / jobs.length;
							const interviewPercentage = (interview * 100) / jobs.length;

							setJobNumbers(prevJobNumbers => ({
								...prevJobNumbers,
								noAnswer: {
									...prevJobNumbers.noAnswer,
									percentage: noAnswerPercentage,
								},
								positiveFeedback: {
									...prevJobNumbers.positiveFeedback,
									percentage: positiveFeedbackPercentage,
								},
								rejected: {
									...prevJobNumbers.rejected,
									percentage: rejectedPercentage,
								},
								interview: {
									...prevJobNumbers.interview,
									percentage: interviewPercentage,
								},
							}));

							//* Get the countries Data
							const countryCounts = jobs.reduce((accumulator: CountryType[], job: JobFormType) => {
								// Check if the country already exists in the accumulator
								//I'm saying, 'try to find the current job.country inside the accumulator array[job]'
								const existingCountry = accumulator.find(
									(countryEntry: CountryType) => countryEntry.country === job.country,
								);

								if (existingCountry) {
									existingCountry.amount += 1;
								} else {
									accumulator.push({ country: job.country, amount: 1 });
								}
								return accumulator;
							}, [] as { country: string; amount: number }[]);
							setCountryData(countryCounts);
						}
					}
				}
			} catch (error) {
				console.log('Error:', error);
			}
		};
		fetchUserAndJobs();
	}, [session, userId]);

	return (
		<>
			{loading ? (
				<Spinners loading={loading} />
			) : (
				<section className="px-4 py-6 bg-blue-50 min-h-screen">
					<div className="container-xl lg:container m-auto">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
							{session?.user.username} DashBoard
						</h2>
						<div className="flex flex-col justify-start items-center gap-5 bg-[#4037ed5c] w-fit h-screen rounded-lg px-4 py-4">
							<DashboardCard
								title="General"
								jobStatus="Total Applications "
								content={`${jobs.length} jobs`}
								Icon={GiSpaceShuttle}
								iconColor="gray"
							/>
							<div className="flex mt-6">
								<DashboardCard
									title="Total"
									jobStatus="No Answer"
									content={`${jobNumbers.noAnswer.percentage.toFixed(0)}%`}
									amount={jobNumbers.noAnswer.amount}
									Icon={IoIosTime}
									iconColor="yellow"
								/>
								<DashboardCard
									title="Total"
									jobStatus="Positive Feedback"
									content={`${jobNumbers.positiveFeedback.percentage.toFixed(0)}%`}
									amount={jobNumbers.positiveFeedback.amount}
									Icon={BiLike}
									iconColor="green"
								/>
								<DashboardCard
									title="Total"
									jobStatus="Interview"
									content={`${jobNumbers.interview.percentage.toFixed(0)}%`}
									amount={jobNumbers.interview.amount}
									Icon={BsPersonArmsUp}
									iconColor="blue"
								/>
								<DashboardCard
									title="Total"
									jobStatus="Rejected"
									content={`${jobNumbers.rejected.percentage.toFixed(0)}%`}
									amount={jobNumbers.rejected.amount}
									Icon={IoIosRadioButtonOn}
									iconColor="red"
								/>
							</div>
							<div className="flex flex-col  bg-white transform transition-transform duration-300 hover:scale-105 rounded-lg mt-10 shadow-2xl border border-gray-500">
								<h3 className="text-2xl font-bold text-blue-500 mb-6 mt-2 text-center">
									Countries
								</h3>
								<div className="flex ">
									{countryData.map((country: CountryType) => (
										<CountriesDashBoard country={country.country} amount={country.amount} />
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default DashboardPage;
