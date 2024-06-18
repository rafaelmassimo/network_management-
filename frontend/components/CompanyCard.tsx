import { CompanyCardProps } from '@/assets/types/dataType';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

const CompanyCard = ({ id, companyName, linkedin, comments }: CompanyCardProps) => {
	return (
		<div className="rounded-xl shadow-md relative ">
			<div className="p-4">
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="text-gray-600">Company Name:</div>
					<h3 className="text-xl font-bold">{companyName}</h3>
				</div>

				<div className="text-gray-600 mb-5">LinkedIn Links:</div>
				{linkedin.length === 0 ? (
					<div className="flex flex-col justify-center items-center h-full mt-4 border-gray-100 border rounded-md p-2">
						<div className="text-orange-600 italic">No LinkedIn link</div>
					</div>
				) : (
					<div className="flex flex-col items-start border-gray-100 border rounded-md p-2 ">
						{linkedin.map((link, index) => (
							<a
								href={`${link}`}
								className={`flex flex-row text-blue-500 font-bold hover:text-blue-800 
								rounded-md  text-center text-sm mb-2`}
								target="_blank"
							>
								<FaLinkedin className="text-blue-500 text-xl mr-3" />
								{`${link}`}
							</a>
						))}
					</div>
				)}

				{comments.length === 0 ? (
					<div className="flex flex-col justify-center items-center h-full mt-4">
						<div className="text-gray-600 text-center">No comments</div>
					</div>
				) : (
					<>
						<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2">
							<div className="text-gray-600">Comment:</div>
						</div>
						<div className="bg-gray-200 rounded-md p-3">
							{comments.length > 0 ? (
								<ul className="text-gray-800 text-sm">
									{comments.map((comment, index) => (
										<li className="mt-1" key={index}>
											• {comment}
										</li>
									))}
								</ul>
							) : (
								<div className="bg-gray-200 rounded-md p-3">
									<div className="text-gray-600 text-sm">No comments</div>
								</div>
							)}
						</div>
					</>
				)}
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

export default CompanyCard;
