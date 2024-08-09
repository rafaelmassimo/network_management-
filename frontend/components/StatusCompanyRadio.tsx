'use client';

import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { CompanyStatus } from '../types/dataType';
import { Button } from './ui/button';

interface StatusCompanyProps {
	status: string;
	jobId: string;
}

interface StatusRadioFields {
	status: string;
	jobId: string;
}

export const getStatusColor = (status:string) => {
    switch (status) {
        case 'positive feedback':
            return 'bg-green-100';
        case 'no answer':
            return 'bg-yellow-100';
        case 'rejected':
            return 'bg-red-300';
        case 'interview':
            return 'bg-fuchsia-200';
        default:
            return 'bg-indigo-100';
    }
};
export const getStatusType = (status:string) => {
    switch (status) {
        case 'positive feedback':
            return 'Positive Feedback';
        case 'no answer':
            return 'No Answer';
        case 'rejected':
            return 'Rejected';
        case 'interview':
            return 'Interview';
        default:
            return 'Select Status';
    }
};

const StatusCompanyRadio = ({ status, jobId }: StatusCompanyProps) => {
	const [currentStatus, setCurrentStatus] = useState<StatusRadioFields>({
		status: status,
		jobId: '',
	});

	const handleStatusChange = async (e: string) => {
		setCurrentStatus((prev) => ({ ...prev, status: e }));

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/status/${jobId}`,
				{
					cache: 'no-store',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ status: e }), //I'll send the new status to the server and the job id
				},
			);
			if (response.status === 200) {
				console.log('Company Status Updated successfully');
				Swal.fire('Done!', 'Company Status Updated successfully.', 'success');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className=''>
				<Button className={`${getStatusColor(currentStatus.status)}`} variant="outline">
					Status: {getStatusType(`${currentStatus.status}`)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit">
				<DropdownMenuLabel>Select the Company Status</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={currentStatus.status}
					onValueChange={(event) => handleStatusChange(event)}
				>
					<DropdownMenuRadioItem value={CompanyStatus.NoAnswer}>No answers</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value={CompanyStatus.PositiveFeedback}>
						Positive Feedback
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value={CompanyStatus.Interview}>Interview</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StatusCompanyRadio;
