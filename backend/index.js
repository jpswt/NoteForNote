require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const path = require('path');
const PORT = process.env.PORT || 6000;

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '/assets')));

var admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.PROJECT_ID,
		clientEmail: process.env.CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY
			? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
			: undefined,
	}),
	storageBucket: process.env.BUCKET_URL,
});

app.locals.bucket = admin.storage().bucket();

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Connected to MongoDB'))
	.catch((err) => console.error(err));

app.post('/upload', upload.single('file'), async (req, res) => {
	const fileName = req.body.name;
	await app.locals.bucket
		.file(fileName)
		.createWriteStream()
		.end(req.file.buffer);
	res.send('file has been uploaded');
});

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/categories', categoryRoute);

mongoose.connection.once('open', () => {
	app.listen(PORT, () => {
		console.log('Server is running');
	});
});
