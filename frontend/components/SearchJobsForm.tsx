"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SearchJobForm = () => {
    const [companyName, setCompanyName] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const router = useRouter();

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        
        if(companyName === "" && jobTitle === "") {
            router.push(`/applications-page`)
        } else {
            const query = `?companyName=${companyName}&jobTitle=${jobTitle}`;
            router.push(`/applications-page/search-results${query}`)
        }
    };
	return (
		<form onSubmit={handleSubmit} className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
			<div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
				<label htmlFor="companyName" className="sr-only">
					Company Name:
				</label>
				<input
					type="text"
					id="companyName"
					placeholder="Enter KeyWord or Company Name"
                    value={jobTitle}
                    onChange={(e) => setCompanyName(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>
			<div className="w-full md:w-2/5 md:pl-2">
				<label htmlFor="jobTitle" className="sr-only">
                Job Title:
				</label>
				<input
					type="text"
					id="jobTitle"
					placeholder="Enter KeyWord or Job Title"
                    value={companyName}
                    onChange={(e) => setJobTitle(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>

            <div className="w-full md:w-2/5 md:pl-2">
				<label htmlFor="country" className="sr-only">
                Country:
				</label>
				<input
					type="text"
					id="country"
					placeholder="Enter KeyWord or Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
					className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
			>
				Search
			</button>
		</form>
	);
};

export default SearchJobForm;
