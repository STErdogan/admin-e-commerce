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
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setCategoryName(category.categoryName);
		setParentCategory(category.parentCategory?._id);
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
	console.log(editCategory);

	return (
		<Layout>
			<h1>Kategoriler</h1>
			<label>
				{editedCategory
					? `Kategori Düzenle: ${editedCategory.categoryName}`
					: 'Yeni Kategori'}
			</label>
			<form onSubmit={saveCategory} className='flex gap-1'>
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
				<button type='submit' className='btn-primary py-1'>
					Kaydet
				</button>
			</form>
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
										className='btn-primary mr-0'>
										<Icons type={IconConst.TRASH} className='w-4 h-4'></Icons>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</Layout>
	);
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
