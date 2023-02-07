import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: "AIzaSyDhdBdesMVRREzG2et2waS7p-HU-kZJqEE",
	authDomain: "yalereveal.firebaseapp.com",
	projectId: "yalereveal",
	storageBucket: "yalereveal.appspot.com",
	messagingSenderId: "169191356117",
	appId: "1:169191356117:web:1568a181790435b567145c",
	measurementId: "G-NKC19VSBGJ",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);


// Don't initialize analytics in the server context
export let firebaseAnalytics = undefined;
if (typeof window !== "undefined") {
	// @ts-ignore
	firebaseAnalytics = getAnalytics(firebaseApp);
}

export const handleSignOut = () => {
	signOut(firebaseAuth);
};
