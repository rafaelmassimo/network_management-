import Link from 'next/link';
import React from 'react';
import { CompanyCardProps } from '../types/dataType';
import Comments from './Comments';
import LinkedinLinks from './LinkedinLinks';
//>> Finish this card
const JobCard: React.FC<CompanyCardProps> = ({ id, companyName, companyLink, linkedin, comments, }) => {
	return (
		<div className="rounded-xl shadow-md relative bg-white ">
			<div className="p-4">
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="text-gray-600">Company Name:</div>
					<h3 className="text-xl font-bold">
						<a href={`${companyLink}`} target="_blank">
							{companyName}
						</a>
					</h3>
				</div>

				{/* This is the LinkedinLinks component */}
				<LinkedinLinks linkedin={linkedin} />

				{/* This is the Comments component */}
				<Comments comments={comments} />

				<div className="flex flex-col lg:flex-row justify-end mt-4">
					<Link
						href={`/network-page/${id}`}
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



