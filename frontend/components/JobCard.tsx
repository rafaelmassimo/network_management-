'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { JobType } from '../types/dataType';
import StatusJobRadio from './StatusJobRadio';
import ModalJobDescription from './ModalJobDescription';
import { limitLengthString } from '@/lib/functions';
const JobCard: React.FC<JobType> = ({
	_id,
	companyName,
	companyLink,
	jobInfo,
	comments,
	country,
	status,
	updatedAt,
	workSite,
}) => {
	const [newUpdatedDate, setNewUpdatedDate] = useState<string>('');

	const toUpperCase = (str: string) => {
		const newString = str.charAt(0).toUpperCase() + str.slice(1);
		return newString;
	};

	const updateDate = (updatedAt: Date) => {
		const date = new Date(updatedAt as Date);

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		};

		const formattedDate = date.toLocaleDateString('en-US', options as any);
		setNewUpdatedDate(formattedDate);
	};

	useEffect(() => {
		updateDate(updatedAt);
	}, []);

	return (
		<div className="rounded-xl shadow-md relative bg-white min-h-[510px] min-w-[440px] mt-2 transform transition-transform duration-300 hover:scale-[1.02]">
			<div className="p-4">
				<p className="text-sm mb-3">
					<span className=" text-gray-600">Last Update: </span> {newUpdatedDate}
				</p>
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="grid grid-cols-2 gap-1 items-center text-black">
						<div>
							<p>Company Name:</p>
							<span className="flex text-xl text-black font-bold p-1 h-9 overflow-y-scroll no-scrollbar">
								<a href={`${companyLink}`} target="_blank">
									{companyName}
								</a>
							</span>
						</div>
						<div>
							<StatusJobRadio
								status={status as string}
								jobId={_id}
								updateDate={updateDate as any}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-start border-gray-100 border rounded-md p-2 mb-4 ">
					<a
						href={`${jobInfo.link}`}
						className={`flex flex-row text-blue-500 font-bold hover:text-blue-800 
								rounded-md  text-center text-sm mb-2`}
						target="_blank"
					>
						<FaLinkedin className="text-blue-500 text-xl mr-3" />
						{limitLengthString(`${jobInfo.title}`)}
					</a>
				</div>

				<div className="flex flex-row items-start border-gray-100 border rounded-md p-2 mb-4 ">
					<div className="text-gray-600">Country:</div>
					<p className="ml-2 text-gray-900">{toUpperCase(country)}</p>
				</div>

				<div className="flex flex-row items-start border-gray-100 border rounded-md p-2 ">
					<div className="text-gray-600">Work Site:</div>
					<p className="ml-2 text-gray-900">{toUpperCase(workSite)}</p>
				</div>

				{comments.length === 0 ? (
					<div className="max-h-auto">
						<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2">
							<div className="text-gray-600">Comment:</div>
						</div>
						<div className="flex flex-row justify-center items-center bg-slate-200 rounded-md p-3 min-h-24 max-h-24 shadow-inner">
							<p className="text-gray-500 italic">No comments</p>
						</div>
					</div>
				) : (
					<div className="h-auto">
					<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2">
						<div className="text-gray-600 ">Comment:</div>
					</div>
					<div className="bg-slate-100 rounded-md p-3 min-h-24 max-h-24 no-scrollbar overflow-y-auto cursor-ns-resize shadow-inner">
						<pre className="whitespace-pre-wrap text-left">{comments}</pre>
					</div>
				</div>
				)}

				<div className="flex flex-col justify-between items-center lg:flex-row mt-4">
					<ModalJobDescription jobTitle={jobInfo.title} JobDescription={jobInfo.description} />
					<Link
						href={`/applications-page/${_id}`}
						className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
					>
						Edit
					</Link>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
