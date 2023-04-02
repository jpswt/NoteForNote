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

var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCT_KEY);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: process.env.BUCKET_URL,
});

app.locals.bucket = admin.storage().bucket();

mongoose
	.connect(process.env.MONGO_URL)
	.then(console.log('Connected to MongoDB'))
	.catch((err) => console.error(err));

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'assets');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, req.body.name);
// 	},
// });

// const upload = multer({ storage: storage });

// app.use('/', (req, res) => {
// 	console.log('Welcome to my server');
// 	res.json('Welcome to my MongoDB Blog Server');
// });
app.post('/upload', upload.single('file'), async (req, res) => {
	const fileName = req.body.name;
	await app.locals.bucket
		.file(fileName)
		.createWriteStream()
		.end(req.file.buffer);
	res.send('file has been uploaded');
	// res.status(200).json('file has been uploaded');
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
