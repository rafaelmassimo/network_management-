"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';


type Props = {
    jobId: string;
    user_id: string;
};

const DeleteJobButton: React.FC<Props>  = ({jobId, user_id}) => {
	const route = useRouter();


    const handleDeleteJob = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            position: "center",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',

        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await fetch(
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/${jobId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user_id}),
                    },
                );
    
                if ('error' in data) {
                    console.log(data.error);
                }
    
                if ('message' in data) {
                    console.log(data.message);
                }
    
                Swal.fire('Deleted!', 'Your Job has been deleted.', 'success');
                route.push('/applications-page');
            }
        });
    };
	return (
		<div className="flex flex-row w-full justify-center items-center ">
			<button
				onClick={handleDeleteJob}
				className="flex flex-row justify-center items-center bg-red-300 hover:bg-red-600 text-white p-2 rounded"
				type="button"
			>
				Delete Job
				<FaTrash className=" ml-2 mt-" />
			</button>
		</div>
	);
};

export default DeleteJobButton;
