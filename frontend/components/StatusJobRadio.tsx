'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { CompanyStatus } from '../types/dataType';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

interface StatusRadioProps {
	status: string;
	jobId: string;
	updateDate: (updatedAt: Date) => void;
}

interface StatusRadioFields {
	status: string;
	jobId: string;
}

const StatusJobRadio = ({ status, jobId, updateDate }: StatusRadioProps) => {
	const [currentStatus, setCurrentStatus] = useState<StatusRadioFields>({
		status: status,
		jobId: '',
	});

	const handleStatusChange = async (e: string) => {
		setCurrentStatus((prev) => ({ ...prev, status: e }));

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/jobs/status/${jobId}`, {
				cache: 'no-store',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: e }), //I'll send the new status to the server and the job id
			});
			if (response.status === 200) {
				const data = await response.json();
				updateDate(data.updatedAt);
				console.log('Job Status Updated successfully');
				Swal.fire('Done!', 'Job Status Updated successfully.', 'success');
			}
		} catch (error) {
			console.log(error);
		}
	};

const getStatusColor = (status:string) => {
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
const getStatusType = (status:string) => {
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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className={`${getStatusColor(currentStatus.status)}`} variant="outline">
					Status: {getStatusType(`${currentStatus.status}`)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit">
				<DropdownMenuLabel>Select the Job Status</DropdownMenuLabel>
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
					<DropdownMenuRadioItem value={CompanyStatus.Rejected}>Rejected</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StatusJobRadio;
