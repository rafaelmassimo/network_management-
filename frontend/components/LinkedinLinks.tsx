import { LinkedinProps } from '@/assets/types/dataType';
import { FaLinkedin } from 'react-icons/fa';

const LinkedinLinks: React.FC<LinkedinProps> = ({ linkedin }) => {
	return (
		<>
			<div className="text-gray-600 mb-5">LinkedIn Links:</div>
			{linkedin.length === 0 ? (
				<div className="flex flex-col justify-center items-center h-full mt-4 border-gray-100 border rounded-md p-2">
					<div className="text-orange-600 italic">No LinkedIn link</div>
				</div>
			) : (
				<div className="flex flex-col items-start border-gray-100 border rounded-md p-2 ">
					{linkedin.map((link, index) => (
						<a
							key={index}
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
		</>
	);
};

export default LinkedinLinks;
