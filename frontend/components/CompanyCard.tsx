import Link from 'next/link';
import React from 'react';
import { CompanyCardProps } from '../types/dataType';
import Comments from './Comments';
import LinkedinLinks from './LinkedinLinks';
import StatusCompanyRadio from './StatusCompanyRadio';
import { limitLengthString } from '@/lib/functions';

const CompanyCard: React.FC<CompanyCardProps> = ({
	id,
	companyName,
	companyLink,
	linkedin,
	comments,
	status,
}) => {
	return (
		<div className="rounded-xl shadow-md relative bg-white max-h-[470px] min-h-[470px] min-w-[440px] mt-2 transform transition-transform duration-300 hover:scale-[1.02]">
			<div className="p-4">
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="grid grid-cols-2 justify-center items-center text-black">
						<div>
							<p>Company Name:</p>
							<span className="flex text-xl text-black font-bold p-1 h-9 overflow-y-scroll no-scrollbar">
								<a href={`${companyLink}`} target="_blank">
									{companyName}
								</a>
							</span>
						</div>
						<div className=''>
							<StatusCompanyRadio status={status as string} jobId={id} />
						</div>
					</div>
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
						Edit
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CompanyCard;
