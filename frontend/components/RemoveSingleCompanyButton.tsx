'use client';

import React from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';

type Props = {
	handleRemoveInputChange: (index:number) => void;
	index: number;
};

const RemoveSingleCompanyButton: React.FC<Props> = ({ handleRemoveInputChange, index }) => {

	const callHandleRemoveInputChange = () => {
		handleRemoveInputChange(index)
	}
	return (
		<div>
			<button onClick={callHandleRemoveInputChange}>
				<IoIosRemoveCircle className="h-6 w-6 text-red-600" />
			</button>
		</div>
	);
};

export default RemoveSingleCompanyButton;
