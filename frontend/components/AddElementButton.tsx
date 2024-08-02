import Link from 'next/link';
import React from 'react';
import { FaPlus } from "react-icons/fa";

type AddElementButtonProps = {
	text: string;
    path:string
};

const AddElementButton = ({ text, path }: AddElementButtonProps) => {
	return (
		<div >
			<button className='flex flex-row justify-center items-center bg-gradient-to-r from-pink-200 to-purple-400 font-bold py-2 px-3 shadow-2xl rounded-full w-fit
            focus:outline-none transition duration-75 focus:translate-y-0.5 focus:shadow-none'>
                <FaPlus className='mr-1' />
				<Link href={path}>{text}</Link>
			</button>
		</div>
	);
};

export default AddElementButton;
