import { withAuth } from 'next-auth/middleware';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

// This line of code if I want to keep all routes protected
export { default } from 'next-auth/middleware';

// export default withAuth(async function middleware(req) {
// 	const session = await getSession({ req: req as any });
// 	console.log('this is session', session);

// 	//* Remember that req is an object that contains the request details as req.nextauth.token or req.nextUrl
// 	// console.log('this is req',req.nextauth.token);

// 	// console.log('this is req',req.nextUrl);

// 	//* You can check the path and redirect the user to a specific page if you need
// 	// if(req.url === undefined) {
// 	//     return NextResponse.rewrite(new URL ("/network-page", req.url))
// 	// }
// });

//* Here I'm limiting the access to the pages that are in the config object
//* In this case the user can access '/' and '/login-page' without being logged in
export const config = {
	matcher: ['/add-company', '/add-job', '/network-page', '/clientMember', '/applications-page'],
};
