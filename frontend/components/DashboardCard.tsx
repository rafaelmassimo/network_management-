import * as React from 'react';
import { PiApproximateEqualsBold } from 'react-icons/pi';

type DashboardCardProps = {
	title: string;
	content: string;
	Icon: React.ElementType;
	iconColor: string;
	jobStatus: string;
	amount?: number;
};

function DashboardCard({ title, content, Icon, iconColor, jobStatus, amount }: DashboardCardProps) {
	const iconColorClass = {
		yellow: 'text-yellow-400',
		green: 'text-green-400',
		blue: 'text-blue-400',
		red: 'text-red-400',
		gray: 'text-gray-400',
	}[iconColor];

	return (
		<div>
			<div className="rounded-md w-[320px] h-[150px] grid grid-cols-3 m-3 shadow-2xl bg-white transform transition-transform duration-300 hover:scale-105 border border-gray-500">
				<div className="col-span-2 flex flex-col justify-evenly place-items-start ml-5 ">
					<div>
						<h1 className="text-lg font-bold">{title}</h1>
					</div>
					<p className="font-bold text-gray-600 mb-1">{jobStatus}</p>
					<div className="flex flex-row items-center gap-2">
						{amount ? (
							<>
								<span className="text-lime-400 bg-cyan-950 py-1 px-3 rounded-lg">
									{amount} {amount && amount > 1 ? 'jobs' : 'job'}
								</span>
								<PiApproximateEqualsBold />
								<span className="text-lime-400 bg-cyan-950 py-1 px-3 rounded-lg">{content}</span>
							</>
						) : (
							<span className="text-lime-400 bg-cyan-950 py-1 px-3 rounded-lg">{content}</span>
						)}
					</div>
				</div>
				<div className="col-span-1 flex flex-col justify-center items-center">
					<Icon className={`w-[65px] h-[65px] ${iconColorClass} shadow-xl rounded-full p-1`} />
				</div>
			</div>
		</div>
	);
}

export default DashboardCard;
