import React from 'react'


type PaginationProps = {
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (newPage: number) => void;

}

const Pagination = ({ page, pageSize, totalItems, onPageChange } : PaginationProps) => {
	const totalPages = Math.ceil(totalItems / pageSize);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 || newPage <= totalPages) {
			// Here you call the function from props that is going to change the page in the Properties.jsx file and the useEffect is going to be fired again
			onPageChange(newPage);
		}
	};

	return (
		<section className="absolute container mx-auto flex justify-center items-center my-8">
			{page === 1 ? (
				<button
					className="ml-2 px-2 py-1 border border-gray-300 rounded opacity-0 cursor-default"
					disabled
				>
					Next
				</button>
			) : (
				<button
					className="mr-2 px-2 py-1 border border-gray-300 rounded"
					onClick={() => handlePageChange(page - 1)}
				>
					Previous
				</button>
			)}

			<span className="mx-2">
				Page {page} of {totalPages}
			</span>
			{page === totalPages ? (
				<button
					className="ml-2 px-2 py-1 border border-gray-300 rounded opacity-0 cursor-default"
					disabled
				>
					Next
				</button>
			) : (
				<button
					className="ml-2 px-2 py-1 border border-gray-300 rounded"
					onClick={() => handlePageChange(page + 1)}
				>
					Next
				</button>
			)}
		</section>
	);
};

export default Pagination;