import { usePathname } from 'next/navigation';
import React from 'react';

const PageName = () => {
	const pathName = usePathname();
	
	let pageName = '';

	switch (true) {
        case pathName === '/add-company':
            pageName = 'Add New Company';
            break;

        case pathName === '/add-job':
            pageName = 'Add New Job Application';
            break;

        case pathName.includes('/network-page/'):
            pageName = 'Edit Company';
            break;

        case pathName.includes('/applications-page/'):
            pageName = 'Edit Job Application';
            break;

            case pathName === ('/register-page'):
                pageName = 'Register Page';
                break;

        default:
            break;
    }
	
	return (
		<div>
			<h1 className="text-3xl text-center font-semibold mb-6">{pageName}</h1>
		</div>
	);
};

export default PageName;
