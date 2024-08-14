import * as React from 'react';

type DashboardCardProps = {
	title: string;
	content: string;
	Icon: React.ElementType;
	iconColor: string;
	jobStatus: string;
};

function DashboardCard({ title, content, Icon, iconColor, jobStatus }: DashboardCardProps) {
	const iconColorClass = {
		yellow: 'text-yellow-400',
		green: 'text-green-400',
		blue: 'text-blue-400',
		red: 'text-red-400',
	}[iconColor];


	return (
		<div>
			<div className="rounded-md w-[320px] h-[150px] grid grid-cols-3 m-3 shadow-lg bg-white transform transition-transform duration-300 hover:scale-105">
				<div className="col-span-2 flex flex-col justify-evenly place-items-start ml-5 ">
					<div>
						<h1 className="text-lg font-bold">{title}</h1>
					</div>
					<div>
						<p className="font-bold text-gray-600 mb-1">{jobStatus}</p>
						<span className="text-lime-400 bg-cyan-950 py-1 px-3 rounded-lg">{content}</span>
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
