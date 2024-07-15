import { JobFormType } from '../types/dataType';

type JobsInputFieldsProps = {
	fields: JobFormType;
	setFields: (fields: JobFormType) => void;
};

const JobsInputFields = ({ fields, setFields }: JobsInputFieldsProps) => {
	return (
		<>
			<div className="flex flex-col w-full items-center rounded-md border p-3 bg-blue-50 my-2">
				<label className="text-center" htmlFor="jobLink">
					Job Link:
				</label>
				<input
					type="text"
					id="jobLink"
					name="jobLink"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="Insert the Link of this opportunity"
					required
					value={fields.jobsLinks.jobLink}
					onChange={(e) =>
						setFields({ ...fields, jobsLinks: { ...fields.jobsLinks, jobLink: e.target.value } })
					}
				/>

				<label className="text-center" htmlFor="jobTitle">
					Job Title:
				</label>
				<input
					type="text"
					id="jobTitle"
					name="jobTitle"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="Insert Title of this opportunity"
					required
					value={fields.jobsLinks.jobTitle}
					onChange={(e) =>
						setFields({ ...fields, jobsLinks: { ...fields.jobsLinks, jobTitle: e.target.value } })
					}
				/>
			</div>
		</>
	);
};

export default JobsInputFields;
