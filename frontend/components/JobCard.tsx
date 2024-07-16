import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { JobType, WorkSite } from '../types/dataType';


const JobCard: React.FC<JobType> = ({ _id, companyName, companyLink, jobInfo, comments, country, status, updatedAt, workSite }) => {


	const toUpperCase = (str: string) => {
		const newString = str.charAt(0).toUpperCase() + str.slice(1);
		return newString;
	}
	
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
	return (
		<div className="rounded-xl shadow-md relative bg-white ">
			<div className="p-4">
				<p className='text-sm mb-3'>
					<span className=" text-gray-600">Last Update: </span> {formattedDate}
				</p>
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="text-gray-600">Company Name:</div>
					<h3 className="text-xl font-bold">
						<a href={`${companyLink}`} target="_blank">
							{companyName}
						</a>
					</h3>
				</div>

				<div className="flex flex-col items-start border-gray-100 border rounded-md p-2 mb-4 ">
					<a
						href={`${jobInfo.link}`}
						className={`flex flex-row text-blue-500 font-bold hover:text-blue-800 
								rounded-md  text-center text-sm mb-2`}
						target="_blank"
					>
						<FaLinkedin className="text-blue-500 text-xl mr-3" />
						{jobInfo.title}
					</a>
				</div>

				<div className="flex flex-row items-start border-gray-100 border rounded-md p-2 mb-4 ">
					<div className="text-gray-600">Country:</div>
					<p className='ml-2'>{toUpperCase(country)}</p>
				</div>

				<div className="flex flex-row items-start border-gray-100 border rounded-md p-2 ">
					<div className="text-gray-600">Work Site:</div>
					<p className='ml-2'>{toUpperCase(workSite)}</p>
				</div>

				{comments.length === 0 ? (
					<div className="flex flex-col justify-center items-center h-full mt-4 border rounded-md">
						<div className="text-gray-600 text-center p-3 italic">No comments</div>
					</div>
				) : (
					<>
						<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2 border rounded-md">
							<div className="text-gray-600">Comment:</div>
						</div>
						<div className="bg-gray-200 rounded-md p-3">
							<p>{comments}</p>
						</div>
					</>
				)}

				<div className="flex flex-col lg:flex-row justify-end mt-4">
					<Link
						href={`/network-page/${_id}`}
						className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
					>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
