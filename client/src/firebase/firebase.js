import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.FB_API_KEY,
	authDomain: 'notefornote-79d2f.firebaseapp.com',
	projectId: 'notefornote-79d2f',
	storageBucket: 'notefornote-79d2f.appspot.com',
	messagingSenderId: '880870801637',
	appId: '1:880870801637:web:c3ce7ecc2c44e07508140c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
