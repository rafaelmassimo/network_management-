'use client';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { CompanyStatus } from '../types/dataType';
import { Label } from './ui/label';

interface StatusCompanyProps {
	status: string;
	jobId: string;
}

interface StatusRadioFields {
	status: string;
	jobId: string;
}

const StatusCompanyRadio = ({ status, jobId }: StatusCompanyProps) => {
	const name = usePathname();
	console.log(name);
	const [currentStatus, setCurrentStatus] = useState<StatusRadioFields>({
		status: status,
		jobId: '',
	});

	useEffect(() => {
		console.log('StatusRadio useEffect');
		

	}, [currentStatus]);

	const handleStatusChange = async (e: string) => {
		setCurrentStatus((prev) => ({ ...prev, status: e }));

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/companies/status/${jobId}`, {cache: "no-store",
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: e }), //I'll send the new status to the server and the job id
			});
			if (response.status === 200) {
				console.log('Job Status Updated successfully');
				Swal.fire('Done!', 'Job Status Updated successfully.', 'success');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-row gap-3">
			<RadioGroup defaultValue="option-one" onValueChange={(event) => handleStatusChange(event)}>
				<div className="flex items-center space-x-2 text-red-400">
					<RadioGroupItem
						className="text-red-400 border-red-300"
						value={CompanyStatus.NoAnswer}
						id="option-one"
						checked={currentStatus.status === CompanyStatus.NoAnswer}
					/>
					<Label htmlFor="option-one">No answers</Label>
				</div>
				<div className="flex flex-row items-center space-x-2 text-sky-900">
					<RadioGroupItem
						className="text-sky-900 border-sky-300"
						value={CompanyStatus.PositiveFeedback}
						id="option-two"
						checked={currentStatus.status === CompanyStatus.PositiveFeedback}
					/>
					<Label htmlFor="option-two">Positive Feedback</Label>
				</div>
				<div className="flex items-center space-x-2 text-green-700">
					<RadioGroupItem
						className="text-green-700 border-green-300"
						value={CompanyStatus.Interview}
						id="option-three"
						checked={currentStatus.status === CompanyStatus.Interview}
					/>
					<Label htmlFor="option-three">Interview</Label>
				</div>
			</RadioGroup>
		</div>
	);
};

export default StatusCompanyRadio;
