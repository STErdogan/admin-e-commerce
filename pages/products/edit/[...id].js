import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
	const [productInfo, setProductInfo] = useState();

	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		if (id) {
			axios.get('/api/products?id=' + id).then((res) => {
				setProductInfo(res.data);
			});
		}
	}, [id]);

	return (
		<Layout>
			<h1 className='text-rose-700'>Ürün Düzenleme</h1>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	);
}
