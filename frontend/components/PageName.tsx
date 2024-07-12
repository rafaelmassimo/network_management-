import { usePathname } from 'next/navigation';
import React from 'react';

const PageName = () => {
	const pathName = usePathname();
    const pageName = pathName.includes('/network-page/')  ? 'Edit Company' : 'Add a New Company';
    console.log('page name:',pathName);
    
	return (
        <div>
        <h1 className="text-3xl text-center font-semibold mb-6">{pageName}</h1>
    </div>
    )
};

export default PageName;
