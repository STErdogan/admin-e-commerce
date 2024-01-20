/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
/* import { IconConst, Icons } from '@/icons/icons'; */

export default function Home() {
	const { data: session } = useSession();

	return (
		<Layout>
			<div className='text-teal-800 flex text-center justify-between'>
				<h2>
					Merhaba, <b>{session?.user?.name}</b>
				</h2>
				<div className='flex bg-yellow-50 gap-1 text-teal-800 rounded-md overflow-hidden'>
					<img
						src={session?.user?.image}
						alt={session?.user?.name}
						className='w-6 h-6'
						referrerPolicy='no-referrer'
					/>
					{/* {session?.user?.email === 'salihtarike@gmail.com' && (
						<Icons
							type={IconConst.STALYF}
							className='w-6 h-6 px-0'
							IconColor='rgb(17 94 89)'
						/>
					)} */}
					<span className='px-1'>{session?.user?.name}</span>
				</div>
			</div>
		</Layout>
	);
}
