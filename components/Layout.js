import { useSession, signIn } from 'next-auth/react';
import Nav from '@/components/Nav';
import { IconConst, Icons } from '@/icons/icons';

export default function Layout({ children }) {
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className='bg-teal-800 h-screen w-screen flex items-center justify-center'>
				<div className='text-center'>
					<Icons type={IconConst.HIFIVE} className='w-60 h-60 mb-5' IconColor='#ffffff' />
					<h1 className='text-teal-800  bg-white font-mono rounded-md p-2 px-3 mb-2  text-center'>
						STSHOP ADMIN
					</h1>
					<button
						onClick={() => signIn('google')}
						className='bg-white text-teal-800 p-2 px-3 rounded-md'>
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
