'use client';

import React from 'react';
import { ClipLoader } from 'react-spinners';

type LoadingProps = {
	loading: boolean;
};

const override = {
	display: 'block',
	margin: '100px auto',
};

const Spinner = ({ loading }: LoadingProps) => {
	return (
		<ClipLoader
			color="#3b82f6"
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
		/>
	);
};

export default Spinner;