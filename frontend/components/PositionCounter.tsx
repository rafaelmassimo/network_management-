import React from 'react';

type PositionCounterProps = {
    totalItems: number;
    text: string;
};


const PositionCounter = ({totalItems, text}:PositionCounterProps) => {
	return (
		<span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
			{text}{' '}{totalItems}
		</span>
	);
};

export default PositionCounter;
