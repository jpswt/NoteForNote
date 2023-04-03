import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.FB_API_KEY,
	authDomain: 'notefornote-79d2f.firebaseapp.com',
	projectId: 'notefornote-79d2f',
	storageBucket: 'notefornote-79d2f.appspot.com',
	messagingSenderId: import.meta.env.FB_MESSAGING_SENDER_ID,
	appId: import.meta.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
