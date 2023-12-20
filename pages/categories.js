import Layout from '@/components/Layout';
import { IconConst, Icons } from '@/icons/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
	const [editedCategory, setEditedCategory] = useState(null);
	const [categoryName, setCategoryName] = useState('');
	const [parentCategory, setParentCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);
	function fetchCategories() {
		axios.get('/api/categories').then((res) => {
			setCategories(res.data);
		});
	}

	async function saveCategory(e) {
		e.preventDefault();
		const data = {
			categoryName,
			parentCategory,
			properties: properties.map((p) => ({ name: p.name, values: p.values.split(',') })),
		};
		if (editedCategory) {
			data._id = editedCategory._id;
			await axios.put('/api/categories', data);
			setEditedCategory(null);
		} else {
			await axios.post('/api/categories', data);
		}

		setCategoryName('');
		setParentCategory('');
		setProperties([]);
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setCategoryName(category.categoryName);
		setParentCategory(category.parentCategory?._id);
		setProperties(
			category.properties.map(({ name, values }) => ({
				name,
				values: values.join(','),
			})),
		);
	}

	function deleteCategory(category) {
		swal.fire({
			title: '?',
			text: `' ${category.categoryName} ' silmek istediğine emin misin?`,
			showCancelButton: true,
			cancelButtonText: 'Vazgeç',
			confirmButtonText: 'Evet, SİL!',
			confirmButtonColor: '#d55d55',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { _id } = category;
				await axios.delete('/api/categories?_id=' + _id);
				fetchCategories();
			}
		});
		/* .catch((error) => {
				// when promise rejected...
			}); */
	}

	function addProperty() {
		setProperties((prev) => {
			return [...prev, { name: '', values: '' }];
		});
	}
	function handlePropertyNameChange(index, property, newName) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].name = newName;

			return properties;
		});
	}
	function handlePropertyValuesChange(index, property, newValues) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].values = newValues;

			return properties;
		});
	}

	function removeProperty(indexToRemove) {
		setProperties((prev) => {
			return [...prev].filter((p, pIndex) => {
				return pIndex !== indexToRemove;
			});
		});
	}

	return (
		<Layout>
			<h1>Kategoriler</h1>
			<label>
				{editedCategory
					? `Kategori Düzenle: ${editedCategory.categoryName}`
					: 'Yeni Kategori'}
			</label>
			<form onSubmit={saveCategory}>
				<div className='flex gap-1'>
					<input
						required
						className='mb-0'
						type='text'
						placeholder='kategori adı'
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
					/>
					<select
						className='mb-0'
						value={parentCategory}
						onChange={(e) => setParentCategory(e.target.value)}>
						<option value=''>Ürün kategorize edilmemiş</option>
						{categories.length > 0 &&
							categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.categoryName}
								</option>
							))}
					</select>
				</div>
				<div className='mb-2'>
					<label className='block'>Ürün Özellikleri</label>
					<button
						onClick={addProperty}
						type='button'
						className='btn-primary text-sm mb-2'>
						Yeni özellik ekle
					</button>
					{properties.length > 0 &&
						properties.map((property, index) => (
							<div className='flex gap-1 mb-2' key={index}>
								<input
									className='mb-0'
									value={property.name}
									onChange={(e) =>
										handlePropertyNameChange(index, property, e.target.value)
									}
									type='text'
									placeholder='örnek: Renk'
								/>
								<input
									className='mb-0'
									value={property.values}
									onChange={(e) =>
										handlePropertyValuesChange(index, property, e.target.value)
									}
									type='text'
									placeholder='Siyah,Beyaz,Kırmızı'
								/>
								<button
									type='button'
									className='btn-default'
									onClick={() => removeProperty(index)}>
									<Icons type={IconConst.TRASH} className='w-5 h-4' />
								</button>
							</div>
						))}
				</div>
				<div className='flex gap-1'>
					{editedCategory && (
						<button
							type='button'
							className='btn-default'
							onClick={() => {
								setEditedCategory(null);
								setCategoryName('');
								setParentCategory('');
								setProperties([]);
							}}>
							İptal
						</button>
					)}
					<button type='submit' className='btn-primary py-1'>
						Kaydet
					</button>
				</div>
			</form>
			{!editedCategory && (
				<table className='basic mt-3'>
					<thead>
						<tr>
							<td>Ürün</td>
							<td>Kategori</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category._id}>
									<td>{category.categoryName}</td>
									<td>{category?.parentCategory?.categoryName}</td>
									<td className='text-center'>
										<button
											onClick={() => editCategory(category)}
											className='btn-primary mr-1'>
											<Icons type={IconConst.PEN} className='w-4 h-4'></Icons>
										</button>
										<button
											onClick={() => deleteCategory(category)}
											className='btn-default mr-0'>
											<Icons
												type={IconConst.TRASH}
												className='w-4 h-4'></Icons>
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	);
}

// eslint-disable-next-line no-unused-vars
export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
