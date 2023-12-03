/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconConst, Icons } from '@/icons/icons';
import Spinner from './Spinner';

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	productImages: existingProductImages,
}) {
	const [title, setTitle] = useState(existingTitle || '');
	const [description, setDescription] = useState(existingDescription || '');
	const [price, setPrice] = useState(existingPrice || '');
	const [productImages, setProductImages] = useState(existingProductImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();
	console.log({ _id });

	async function saveProduct(e) {
		e.preventDefault();
		const data = {
			title,
			description,
			price,
			productImages,
		};
		if (_id) {
			await axios.put('/api/products', {
				...data,
				_id,
			});
		} else {
			await axios.post('/api/products', data);
		}
		setGoToProducts(true);
	}
	if (goToProducts) {
		router.push('/products');
	}

	async function uploadImages(e) {
		console.log(e);
		const files = e.target?.files;
		if (files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();
			for (const file of files) {
				data.append('file', file);
			}

			const res = await axios.post('/api/upload', data);
			console.log(res.data);
			setProductImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setIsUploading(false);
		}
	}

	return (
		<form onSubmit={saveProduct}>
			<label>Ürün Adı</label>
			<input
				type='text'
				placeholder='ürün Adı'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label>Foto</label>
			<div className='mb-2 flex flex-wrap gap-1'>
				{!!productImages?.length &&
					productImages.map((link) => (
						<div key={link} className='h-24'>
							<img src={link} alt='' className='rounded-md w-28' />
						</div>
					))}
				{isUploading && (
					<div className='h-24 p-1 flex items-center rounded-md'>
						<Spinner />
					</div>
				)}
				<label className='flex w-28 h-24 items-center cursor-grab justify-center rounded-md text-gray-600 bg-gray-200 border border-gray-300 hover:bg-blue-900 hover:text-white '>
					<Icons type={IconConst.UPLOAD} className='w-8 h-8' />
					<input type='file' className='hidden' onChange={uploadImages} />
				</label>
			</div>
			<label>Açıklama</label>
			<textarea
				className='focus:h-24'
				placeholder='açıklama'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label>Fiyat</label>
			<input
				type='number'
				placeholder='fiyat'
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>

			<button className='btn-primary'>Kaydet</button>
		</form>
	);
}
