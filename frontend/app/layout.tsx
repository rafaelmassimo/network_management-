import '@/assets/styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import React from 'react';
import { SessionProvider } from '../components/AuthProvider';
import Footer from '../components/Footer';

import NavBar from '../components/Navbar';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Network Management',
	description:
		'This is an app where you can manage your network that you are creating on linkedIn, you can add a company, save all linkedin link and add some content, all you need to manage your tasks.',
	keywords: 'network, management, linkedin, company, content, tasks, app, job, work, social',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<html lang="en" className='bg-blue-50'>
				<body className={montserrat.className}>
					<NavBar />
					{children}
				<Footer />
				</body>
			</html>
		</SessionProvider>
	);
}
