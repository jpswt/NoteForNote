const router = require('express').Router();
const Post = require('../models/Post');

// Get All Posts
router.get('/', async (req, res) => {
	const username = req.query.user;
	const category = req.query.category;
	try {
		let posts;
		if (username) {
			posts = await Post.find({ username: username });
		} else if (category) {
			posts = await Post.find({
				categories: {
					$in: [category],
				},
			});
		} else {
			posts = await Post.find().sort({ createdAt: -1 });
		}
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Get Single Post
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Create Post
router.post('/', async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Update Post
router.put('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('Not authorized to update post!');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Delete Post
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				await post.deleteOne();
				res.status(200).json('Post has been deleted');
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json('Not authorized to delete post!');
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
