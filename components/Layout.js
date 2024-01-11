import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from '@/components/Nav';
import { IconConst, Icons } from '@/icons/icons';
import { useState } from 'react';
import Logo from './Logo';

export default function Layout({ children }) {
	const [showNav, setShowNav] = useState(false);
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className='bg-teal-800 h-screen w-screen flex items-center justify-center'>
				<div className='text-center'>
					<Icons type={IconConst.HIFIVE} className='w-60 h-60 mb-5' IconColor='#ffffff' />
					<h1
						onClick={() => signOut()}
						className='text-teal-800  bg-white font-mono rounded-md p-2 px-3 mb-2  text-center'>
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
		<div className='bg-teal-900 min-h-screen'>
			<div className='md:hidden flex items-center p-2'>
				<button onClick={() => setShowNav(!showNav)} className='text-teal-300'>
					<Icons type={IconConst.NAVBAR} />
				</button>
				<div className='flex grow justify-center mr-6'>
					<Logo />
				</div>
			</div>
			<div className='flex'>
				<Nav show={showNav} />
				<div className='bg-teal-50 flex-grow rounded-md p-4 mt-2'>{children}</div>
			</div>
		</div>
	);
}
