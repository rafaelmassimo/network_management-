"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';


type Props = {
    companyId: string;
    user_id: string;
};



const DeleteCompanyButton: React.FC<Props>  = ({companyId, user_id}) => {
	const route = useRouter();


    const handleDeleteCompany = async () => {
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
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/${companyId}`,
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
    
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                route.push('/network-page');
            }
        });
    };
	return (
		<div className="flex flex-row w-full justify-center items-center ">
			<button
				onClick={handleDeleteCompany}
				className="flex flex-row justify-center items-center bg-red-300 hover:bg-red-600 text-white p-2 rounded"
				type="button"
			>
				Delete Company
				<FaTrash className=" ml-2 mt-" />
			</button>
		</div>
	);
};

export default DeleteCompanyButton;
