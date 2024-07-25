import { UserTypeImported } from '@/types/dataType';
import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

const options: NextAuthOptions = {
	providers: [
		LinkedInProvider({
			clientId: process.env.NEXT_LINKEDIN_CLIENT_ID!,
			clientSecret: process.env.NEXT_LINKEDIN_CLIENT_SECRET!,
		}),

		GitHubProvider({
			profile(profile) {
				// console.log('Profile Github:', profile);
				let userRole = 'Github User';
				// This is user is going to be inside session.user.role you can see it on Member page if you are logged in
				//if you area logging in with github you can see the userRole is ADMIN user as set below
				if (profile?.email === 'rafael_massimo@hotmail.com') {
					userRole = 'ADMIN';
				}
				return {
					//here im sending all the properties that I got from github and make it separate
					...profile,
					//Here I'm applying the userRole to the user that I decided few line above
					role: userRole,
				};
			},
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		GoogleProvider({
			profile(profile) {
				// console.log('Profile Google:', profile);
				let userRole = 'USER';
				//Here we are going to have the userRole as google User from the line 27 you can see it on the Member page if you are logged in
				// if(profile?.email === 'rafael_massimo@hotmail.com'){
				//     userRole = "ADMIN"
				// }
				return {
					//here im sending all the properties that I got from google and make it separate
					...profile,
					//Here I'm applying the userRole to the user that I decided few line above
					role: userRole,
					id: profile.sub,
				};
			},
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialProvider({
			//* In this case the user has to create first an account with email and password and then he can login with the same credentials
			//* I have created with postman a user
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'your email' },
				password: { label: 'Password', type: 'password', placeholder: 'your password' },
			},
			async authorize(
				credentials: Record<'email' | 'password', string> | undefined,
			): Promise<any | null> {
				const { email, password } = credentials as { email: string; password: string };

				if (!email || !password) {
					return null;
				}
				try {
					// Replace direct database access with a fetch request to the backend
					const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/authenticate`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});

					if (!response.ok) {
						console.log('Authentication failed');
						return null;
					}

					const foundUser: UserTypeImported = await response.json();

					console.log('User:', foundUser);
					return foundUser;
				} catch (error) {
					console.log('Error:', error);
				}
				return null; // Ensure you return null or a user object consistently
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/createUser`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: user.email ?? '',
						username: user.name || (user as any).login || '',
						picture: (user as any).picture || (user as any).avatar_url || '',
					}),
				});
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				// Store the current role or set to '*USER*' if not present
				const currentRole = session.user.role || token.role || '*USER*';

				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/getOne`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email: session.user.email }),
					});

					const data = await response.json();
					// Update session.user with fetched data
					session.user = data;
					// Reassign the role to avoid overriding it
					session.user.role = currentRole;
				} catch (error) {
					console.error('Failed to fetch user data:', error);
				}
			}

			return session;
		},
	},
};

export default options;
