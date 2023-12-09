import { useSession, signIn } from 'next-auth/react';
import Nav from '@/components/Nav';

export default function Layout({ children }) {
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className='bg-teal-800 w-screen h-screen flex items-center'>
				<div className='text-center w-full'>
					<button
						onClick={() => signIn('google')}
						className='bg-white p-2 px-4 rounded-lg'>
						Google ile Giriş
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-teal-900 min-h-screen flex'>
			<Nav />
			<div className='bg-teal-50 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>{children}</div>
		</div>
	);
}
