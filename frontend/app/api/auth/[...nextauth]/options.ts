import { UserTypeImported } from '@/types/dataType';
import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
	providers: [
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
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				//if you do not have a role it will be a *user* as defined below
				session.user.role = token.role || '*USER*';
			}
			return session;
		},
	},
};

export default options;
