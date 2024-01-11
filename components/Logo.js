import Link from 'next/link';
import { Icons, IconConst } from '@/icons/icons';

export default function Logo() {
	return (
		<Link href={'/'} className='flex gap-1 p-1 rounded-md text-teal-50'>
			<Icons type={IconConst.STOREICON} />

			<span className='font-mono font-bold '>STShopAdmin</span>
		</Link>
	);
}
