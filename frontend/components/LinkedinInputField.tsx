'use client';

import React, { useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { CompanyFormType } from '../types/dataType';
import RemoveSingleCompanyButton from './RemoveSingleCompanyButton';

type LinkedinInputFieldProps = {
	linkedinProfiles: string[];
	setFields: (fields: CompanyFormType) => void;
	fields: CompanyFormType;
};

const LinkedinInputField = ({ linkedinProfiles, setFields, fields, }: LinkedinInputFieldProps) => {
	const [arrayOfLinks, setArrayOfLinks] = useState<string[]>(['']);

	useEffect(() => {
		setArrayOfLinks(linkedinProfiles);
	}, [linkedinProfiles]);

	const handleAddNewInputField = () => {
		const updatedLinks: string[] = [...arrayOfLinks, ''];
		setArrayOfLinks(updatedLinks);
		setFields({ ...fields, linkedinProfiles: updatedLinks });
	};

	const handleInputChange = (index: number, value: string) => {
		const updatedLinks = [...arrayOfLinks];
		updatedLinks[index] = value;
		setArrayOfLinks(updatedLinks);
		setFields({ ...fields, linkedinProfiles: updatedLinks });
	};

	const handleRemoveInputChange = (index: number) => {
		const updatedLinks = [...arrayOfLinks.slice(0, index), ...arrayOfLinks.slice(index + 1)];
		setArrayOfLinks(updatedLinks);
		setFields({ ...fields, linkedinProfiles: updatedLinks });
	};

	return (
		<>
			{arrayOfLinks.map((link, i) => (
				<div className="flex flex-row w-full justify-center items-center" key={i}>
					<input
						type="text"
						id="linkedinProfiles"
						name="linkedinProfiles"
						className="border rounded w-full py-2 px-3 mb-2"
						placeholder="Insert LinkedIn Profile"
						value={link}
						onChange={(e) => handleInputChange(i, e.target.value)}
					/>
					{arrayOfLinks.length === 1 ? null : (
						<div className='ml-2'>

						<RemoveSingleCompanyButton
						
						handleRemoveInputChange={handleRemoveInputChange}
						index={i}
						/>
						</div>
					)}
				</div>
			))}
			<div className="flex flex-row justify-center items-center mx-auto">
				<button
					type="button"
					className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center  me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3 "
					onClick={handleAddNewInputField}
				>
					<TiPlus className="h-4 w-4 text-white" />
					<span className="sr-only">Icon description</span>
				</button>
			</div>
		</>
	);
};

export default LinkedinInputField;
