import React from 'react';
import countriesFlags from '../lib/countries';
import { FlagComponent } from 'country-flag-icons/react/3x2';
import { FcGlobe } from "react-icons/fc";

// Define the type for countriesFlags with an index signature
type CountriesFlagsType = {
	[key: string]: FlagComponent;
};

// Cast the imported countriesFlags to the defined type
const typedCountriesFlags: CountriesFlagsType = countriesFlags;

type CountriesDashBoardProps = {
	country: string;
	amount: number;
};

const CountriesDashBoard = ({ country, amount }: CountriesDashBoardProps) => {
	// Get the flag component based on the 'country' prop
	const FlagIcon: FlagComponent = typedCountriesFlags[country] || null;

	return (
		<div className="flex flex-row p-4 rounded-lg m-2 justify-center items-center">
			{FlagIcon ? (
				<div className="flex flex-col items-center gap-3">
					<FlagIcon className="shadow-xl rounded-md transform transition-transform duration-300 hover:scale-105" style={{ width: '60px', height: '40px' }} />
					<div className="bg-cyan-950 px-2 rounded-lg">
						<span className="text-white ">{country} </span>
						<span className="text-sky-400 ">{amount}</span>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center gap-3 ">
					<FcGlobe className="shadow-xl rounded-md text-red-600 transform transition-transform duration-300 hover:scale-105" style={{ width: '60px', height: '40px' }} />
					<div className="bg-cyan-950 px-2 rounded-lg">
						<span className="text-white ">{country} </span>
						<span className="text-sky-400 m">{amount}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CountriesDashBoard;
