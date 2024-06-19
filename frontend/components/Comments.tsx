import { CommentsProps } from '@/assets/types/dataType';
import React from 'react';

const Comments = ({ comments }: CommentsProps) => {
	return (
		<>
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
		</>
	);
};

export default Comments;
