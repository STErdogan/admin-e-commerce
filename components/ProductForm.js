/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconConst, Icons } from '@/icons/icons';
import { ReactSortable } from 'react-sortablejs';

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	productImages: existingProductImages,
	category: existingCategory,
	properties: existingProperties,
}) {
	const [title, setTitle] = useState(existingTitle || '');
	const [description, setDescription] = useState(existingDescription || '');
	const [category, setCategory] = useState(existingCategory || '');
	const [productProperties, setProductProperties] = useState(existingProperties || {});
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
			properties: productProperties,
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

	function productPropHandler(propName, value) {
		setProductProperties((prev) => {
			const newProductProps = { ...prev };
			newProductProps[propName] = value;
			return newProductProps;
		});
	}

	const propertiesToFill = [];
	if (categories.length > 0 && category) {
		let catInfo = categories.find(({ _id }) => _id === category);

		propertiesToFill.push(...catInfo.properties);
		while (catInfo?.parentCategory?._id) {
			const parentCat = categories.find(({ _id }) => _id === catInfo?.parentCategory?._id);
			propertiesToFill.push(...parentCat.properties);
			catInfo = parentCat;
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
			<label>Kategori</label>
			<select value={category} required onChange={(e) => setCategory(e.target.value)}>
				<option value='' key=''>
					Kategorize Edilmemiş
				</option>
				{categories.length > 0 &&
					categories.map((c, i) => (
						<option key={i} value={c._id} className='text'>
							{c.categoryName}
						</option>
					))}
			</select>
			{propertiesToFill.length > 0 &&
				propertiesToFill.map((p, i) => (
					<div className='' key={i} id={p._id}>
						<label>{p.name[0].toUpperCase() + p.name.substring(1).toLowerCase()}</label>
						<div>
							<select
								key={p._id}
								value={productProperties[p.name]}
								onChange={(e) => productPropHandler(p.name, e.target.value)}>
								{p.values.map((v, i) => (
									<option key={i}>{v}</option>
								))}
							</select>
						</div>
					</div>
				))}

			<label>Fotoğraflar</label>
			<div className='mb-2 flex flex-wrap gap-1'>
				<ReactSortable
					className='flex flex-wrap gap-1'
					list={productImages}
					setList={updateProductImages}>
					{!!productImages?.length &&
						productImages.map((link, i) => (
							<div key={i} className='h-24'>
								<img src={link} alt='' className='rounded-md w-28' />
							</div>
						))}
				</ReactSortable>
				{isUploading && (
					<div className='h-24 p-1 flex items-center rounded-md'>
						<Spinner />
					</div>
				)}
				<label className='flex w-28 h-24 items-center cursor-grab justify-center rounded-md text-gray-600 shadow-sm bg-white border border-gray-200 hover:bg-teal-800 hover:text-white hover:shadow-teal-800 '>
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
