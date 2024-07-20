
import { CommentsProps } from '../types/dataType'
import React from 'react';

const Comments = ({ comments }: CommentsProps) => {
	return (
		<>
			{comments.length === 0 ? (
					<div className="max-h-auto">
						<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2">
							<div className="text-gray-600">Comment:</div>
						</div>
						<div className="flex flex-row justify-center items-center bg-gray-200 rounded-md p-3 min-h-20 max-h-25">
							<p className='text-gray-500 italic'>No comments</p>
						</div>
					</div>
				) : (
					<div className="max-h-auto">
						<div className="flex flex-row lg:flex-row justify-start mb-4 mt-2">
							<div className="text-gray-600">Comment:</div>
						</div>
						<div className="bg-gray-200 rounded-md p-3 min-h-20  max-h-25">
							<p>{comments}</p>
						</div>
					</div>
				)}
		</>
	);
};

export default Comments;
