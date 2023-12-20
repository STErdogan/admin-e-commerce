import Link from 'next/link';
import { Icons, IconConst } from '@/icons/icons';
import { useRouter } from 'next/router';

export default function Nav() {
	const inactiveLink = 'flex gap-1 p-1';
	const activeLink = inactiveLink + ' bg-teal-50 text-teal-800 rounded-l-lg';
	const router = useRouter();
	const { pathname } = router;

	return (
		<aside className='text-teal-300 p-4 pr-0'>
			<Link href={'/'} className='flex gap-1 p-1 mb-4 mr-4 bg-teal-700 rounded-md text-teal-200'>
				<Icons type={IconConst.STOREICON} />
				<span className=''>STShopAdmin</span>
			</Link>

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
				
			</nav>
		</aside>
	);
}
