import React, { Suspense } from 'react';
import JobApplication from '../../../components/JobApplication';

export default function SearchResults() {
	return (
		<Suspense>
			<JobApplication />
		</Suspense>
	);
}
