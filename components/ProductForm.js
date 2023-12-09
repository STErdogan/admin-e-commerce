/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconConst, Icons } from '@/icons/icons';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	productImages: existingProductImages,
	category: existingCategory,
}) {
	const [title, setTitle] = useState(existingTitle || '');
	const [description, setDescription] = useState(existingDescription || '');
	const [category, setCategory] = useState(existingCategory || '');
	const [price, setPrice] = useState(existingPrice || '');
	const [productImages, setProductImages] = useState(existingProductImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [categories, setCategories] = useState([]);
	const router = useRouter();

	useEffect(() => {
		axios.get('/api/categories').then((res) => {
			setCategories(res.data);
		});
	}, []);

	async function saveProduct(e) {
		e.preventDefault();
		const data = {
			title,
			description,
			price,
			productImages,
			category,
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
		const files = e.target?.files;
		if (files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();
			for (const file of files) {
				data.append('file', file);
			}

			const res = await axios.post('/api/upload', data);

			setProductImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setIsUploading(false);
		}
	}
	function updateProductImages(productImages) {
		setProductImages(productImages);
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
			<label>Kategori</label>
			<select value={category} onChange={(e) => setCategory(e.target.value)}>
				<option value=''>Kategorize Edilmemiş</option>
				{categories.length > 0 &&
					categories.map((c) => (
						<option key={c._id} value={c._id}>
							{c.categoryName}
						</option>
					))}
			</select>
			<label>Foto</label>
			<div className='mb-2 flex flex-wrap gap-1'>
				<ReactSortable
					className='flex flex-wrap gap-1'
					list={productImages}
					setList={updateProductImages}>
					{!!productImages?.length &&
						productImages.map((link) => (
							<div key={link} className='h-24'>
								<img src={link} alt='' className='rounded-md w-28' />
							</div>
						))}
				</ReactSortable>
				{isUploading && (
					<div className='h-24 p-1 flex items-center rounded-md'>
						<Spinner />
					</div>
				)}
				<label className='flex w-28 h-24 items-center cursor-grab justify-center rounded-md text-gray-600 bg-gray-200 border border-gray-300 hover:bg-teal-800 hover:text-white '>
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
