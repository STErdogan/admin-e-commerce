import Link from 'next/link';
import { Icons, IconConst } from '@/icons/icons';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Logo from './Logo';

export default function Nav({ show }) {
	const inactiveLink = 'flex gap-1 p-1  font-serif';
	const activeLink =
		inactiveLink + ' bg-teal-50 text-teal-800 font-bold rounded-md shadow-md shadow-gray-100';
	const router = useRouter();
	const { pathname } = router;
	async function logout() {
		await router.push('/');
		await signOut();
	}

	return (
		<aside
			className={
				(show ? 'left-0' : '-left-full') +
				' top-0 text-teal-300 bg-teal-900 p-4 fixed w-full h-full md:static md:w-auto transition-all'
			}>
			<div className='mb-4 mr-4'>
				<Logo />
			</div>

			<nav className='flex flex-col gap-2'>
				<Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
					<Icons type={IconConst.HOMEICON} />
					Anasayfa
				</Link>
				<Link
					href={'/products'}
					className={pathname.includes('/products') ? activeLink : inactiveLink}>
					<Icons type={IconConst.PRODUCTICON} />
					Ürünler
				</Link>
				<Link
					href={'/categories'}
					className={pathname.includes('/categories') ? activeLink : inactiveLink}>
					<Icons type={IconConst.CATEGORIES} />
					Kategoriler
				</Link>
				<Link
					href={'/orders'}
					className={pathname.includes('/orders') ? activeLink : inactiveLink}>
					<Icons type={IconConst.ORDERSICON} />
					Siparişler
				</Link>
				<Link
					href={'/settings'}
					className={pathname.includes('/settings') ? activeLink : inactiveLink}>
					<Icons type={IconConst.SETTINGSICON} />
					Ayarlar
				</Link>
				<button onClick={logout} className={inactiveLink}>
					<Icons type={IconConst.LOGOUT} />
					Çıkış
				</button>
			</nav>
		</aside>
	);
}
