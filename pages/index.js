/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	return (
		<Layout>
			<div className='text-teal-800 flex text-center justify-between'>
				<h2>
					Merhaba,<b>{session?.user?.name}</b>
				</h2>
				<div className='flex bg-yellow-50 gap-1 text-teal-800 rounded-md overflow-hidden'>
					<img
						src={session?.user?.image}
						alt={session?.user?.name}
						className='w-6 h-6'
						referrerPolicy='no-referrer'
					/>
					<span className='px-2'>{session?.user?.name}</span>
				</div>
			</div>
		</Layout>
	);
}
