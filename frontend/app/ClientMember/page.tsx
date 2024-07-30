'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


// IN order to make this page works, which means to make procted the front end pages and be able to use the useSession hook, we need to wrap our app with the SessionProvider
// Go to check the authProvider.tsx file to see how to do it

const ClientMember = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/api/auth/signin?callbackUrl=/ClientMember'); // the callbackUrl helps you to redirect the user to the page he was trying to access after the login
			//check also the navbar we also have a different callbackUrl
		},
	});

    console.log(session);
    
	return (
		<div>
			<h1>Member Client Server Page</h1>
			<p>{session?.user?.name}</p>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
		</div>
	);
};

export default ClientMember;
