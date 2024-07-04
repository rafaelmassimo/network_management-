'use client';


//Here the instructor used a different approach to import the useSession hook, he used the following import, and then when you need to import into the layout
// you need to import as follows:
// import { SessionProvider } from '@/components/AuthProvider'; on the layout file

export { SessionProvider} from 'next-auth/react';
