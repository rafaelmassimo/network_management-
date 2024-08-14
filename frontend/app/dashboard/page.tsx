import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { IoIosRadioButtonOn } from "react-icons/io";

const page = () => {
	return (
		<div>
			<DashboardCard title="title" content="content" Icon={IoIosRadioButtonOn} iconColor='red' />
		</div>
	);
};

export default page;
