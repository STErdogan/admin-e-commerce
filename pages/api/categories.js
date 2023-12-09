import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();

	if (method === 'GET') {
		res.json(await Category.find().populate('parentCategory'));
	}

	if (method === 'POST') {
		const { categoryName, parentCategory } = req.body;
		const categoryDoc = await Category.create({
			categoryName,
			parentCategory: parentCategory || undefined,
		});
		res.json(categoryDoc);
	}

	if (method === 'PUT') {
		const { categoryName, parentCategory, _id } = req.body;
		const categoryDoc = await Category.updateOne({ _id }, { categoryName, parentCategory });
		res.json(categoryDoc);
	}

	if (method === 'DELETE') {
		const { _id } = req.query;
		await Category.deleteOne({ _id });
		res.json('ok');
	}
}
