const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPW = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPW,
			about: req.body.about,
		});

		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json('Incorrect Username/Password');
		}
		const validateUser = await bcrypt.compare(req.body.password, user.password);
		if (!validateUser) {
			return res.status(400).json('Incorrect Username/Password');
		}
		// const { password, ...others } = user._doc;
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
