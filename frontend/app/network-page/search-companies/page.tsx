import React, { Suspense } from 'react';
import CompanyApplication from '../../../components/CompanyApplication';

const CompanySearchPage = () => {
	return (
		<Suspense>
			<CompanyApplication />
		</Suspense>
	);
};

export default CompanySearchPage;
