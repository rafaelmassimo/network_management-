'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterForm from '../../components/RegisterForm';

export default function LoginPage() {
	//* Check if the user is logged in, if yes redirect to network-page
	//* Keep in mind that Index is redirecting to login-page
	const { data: session } = useSession();

	if (session) {
		const router = useRouter();
		router.push('/network-page');
	}

	return (
        //* Every time you are using the condition and && () you need to wrap all return with a fragment
		<>
			{!session && (
				<section className="bg-gradient-to-r from-black to-sky-900 h-screen py-5 flex relative">
					<video
						className="absolute top-0 left-0 w-full h-full object-cover z-0"
						autoPlay
						loop
						muted
					>
						<source src="/video/background.mp4" type="video/mp4" />
					</video>

					<div className="container-xl lg:container m-auto relative z-10">
						<div
							className="grid grid-cols-3 lg:grid-cols-3 gap-9 relative"
							style={{ gridTemplateColumns: '50% 0.5% 47%' }}
						>
							<div className="relative flex items-center justify-center">
								<div className="relative z-10 bg-gray-800 bg-opacity-95 p-4 rounded-lg w-full">
									<p className="text-gray-200 text-center font-semibold tracking-wider leading-loose text-lg indent-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
										<a className=" text-green-200 font-bold text-lg">CareerExplorer </a> makes it
										easy to manage your{' '}
										<a className="underline decoration-pink-500 text-white font-bold">
											LinkedIn Connections
										</a>{' '}
										and build your network. Keep track of your{' '}
										<a className=" text-white underline decoration-indigo-500 font-bold">
											Job Applications
										</a>
										{` `}
										in one place, stay organized, and take control of your career. Whether you're
										growing your connections or looking for a job, our app is here to help you
										succeed.
									</p>
								</div>
							</div>
							<div className="border rounded-lg bg-slate-50 opacity-50"></div>{' '}
							{/* Empty middle column */}
							<div className="bg-white p-4 border rounded-lg opacity-95">
								<div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
									<div className=" flex flex-col items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md border-2 border-transparent">
										<p className="text-gray-500 text-center text-[1rem]">
											If you don't have an account please create one or Click Login button to create
											an account with Google or GitHub
										</p>

										<button
											className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl text-white focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold py-2 px-4 shadow-xl rounded-full focus:outline-none mt-3 transition duration-100 focus:translate-y-1 focus:shadow-none mb-3 w-fit "
											type="submit"
											style={{
												cursor: 'pointer',
											}}
										>
											<Link href="/api/auth/signin">Login</Link>
										</button>
									</div>
								</div>
								<p className="text-center">OR</p>

								<h1 className="text-3xl font-bold text-gray-700 text-center mb-2">
									Create an Account
								</h1>

								<div className="bg-gray-300 border rounded-md">
									<RegisterForm />
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
