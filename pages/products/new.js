import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';

export default function NewProduct() {
	return (
		<Layout>
			<h1 className='text-rose-700'>Yeni Ürün</h1>
			<ProductForm />
		</Layout>
	);
}
