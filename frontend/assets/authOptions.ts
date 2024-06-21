import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const apiUrl = 'http://localhost:3005';

type UserProfile = {
	id: string;
	email: string;
	name: string;
	picture: string;
};

type Session = {
	user: UserProfile;
	expires: string;
	error: string;
};

export const authOptions = {
	providers: [
		GoogleProvider<GoogleProfile>({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',

			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		async signIn( {profile}:any) {
			// const res = await fetch(`${apiUrl}/api/user/check-user`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		email: profile.email,
			// 		name: profile.name,
			// 		picture: profile.picture,
			// 	}),
			// });
			// if (res.ok) {
			// 	return true;
			// }
		},


		//>> A function to run on successful sign in
		// Modifies the session object
		async session({ session }: any) {
			// //1. Get user from database
			// const res = await fetch(`${apiUrl}/api/user/getOne`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		email: session.user.email,
			// 	}),
			// });

			// if (res.ok) {
			// 	// Parse the JSON response
			// 	const userData = await res.json();
			// 	// Assuming userData contains a user object with an _id field
			// 	//2. Assign the user id to the session
			// 	session.user.id = userData._id.toString();
			// } else {
			// 	// Handle the case where the fetch call was not successful
			// 	console.error('Failed to fetch user data');
			// 	//3. Return session
			// 	return session;
			// }
		},
	},
};
