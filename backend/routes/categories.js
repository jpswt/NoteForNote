const router = require('express').Router();
const Category = require('../models/Category');

//Get all categories
router.get('/', async (req, res) => {
	try {
		const categories = await Category.find();
		res.set('Cache-control', 'public, max-age=300');
		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create new category
router.post('/', async (req, res) => {
	const newCategory = new Category(req.body);
	try {
		const savedCategory = await newCategory.save();
		res.status(200).json(savedCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
