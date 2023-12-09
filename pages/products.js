import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconConst, Icons } from '@/icons/icons';

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get('/api/products').then((res) => {
			setProducts(res.data);
		});
	}, []);

	return (
		<Layout>
			<Link className='bg-teal-800 text-white rounded-md py-1 px-2' href={'/products/new'}>
				Yeni ürün ekle
			</Link>

			<table className='basic mt-2'>
				<thead>
					<tr>
						<td>Ürün Adı</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id} id={product._id}>
							<td>{product.title}</td>
							<td>
								<Link href={'products/edit/' + product._id}>
									<Icons type={IconConst.PEN} className='w-4 h-4' />
								</Link>

								<Link href={'products/delete/' + product._id}>
									<Icons type={IconConst.TRASH} className='w-4 h-4' />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Layout>
	);
}
