import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAwnhnPtRHbSap7EGCC-gEdJbT_tAGDThM",
	authDomain: "photo-review-app-28678.firebaseapp.com",
	projectId: "photo-review-app-28678",
	storageBucket: "photo-review-app-28678.appspot.com",
	messagingSenderId: "728275299809",
	appId: "1:728275299809:web:40143618c73e30cadef6a0",
};

//Init Firebase
const app = initializeApp(firebaseConfig);

// Firestore Instance
const db = getFirestore(app);

//Firebase Storage instance
const storage = getStorage(app);

// Firebase auth instance
const auth = getAuth();

export { app as default, db, auth, storage };
