import * as React from 'react';

type DashboardCardProps = {
	title: string;
	content: string;
	Icon: React.ElementType;
	iconColor: string;
};

function DashboardCard({ title, content, Icon, iconColor }: DashboardCardProps) {
	return (
		<div>
			<div className="rounded-md w-[300px] h-[150px] grid grid-cols-3 m-3 shadow-md">
				<div className="col-span-2 flex flex-col justify-center place-items-start ml-5 ">
					<h2 className="font-bold text-gray-600">{title}</h2>
					<span className='text-lime-400 bg-cyan-950 p-1 rounded-lg mt-1'>{content}</span>
				</div>
				<div className="col-span-1 flex flex-col justify-center items-center">
					<Icon className={`w-[60px] h-[60px] text-${iconColor}-400 shadow-xl rounded-full `} />
				</div>
			</div>
		</div>
	);
}

export default DashboardCard;
