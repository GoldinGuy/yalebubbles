import { AppProps } from 'next/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "../styles/global.css";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhdBdesMVRREzG2et2waS7p-HU-kZJqEE",
  authDomain: "yalereveal.firebaseapp.com",
  projectId: "yalereveal",
  storageBucket: "yalereveal.appspot.com",
  messagingSenderId: "169191356117",
  appId: "1:169191356117:web:1568a181790435b567145c",
  measurementId: "G-NKC19VSBGJ"
};
// Initialize Firebase
if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}


const MyApp = ({ Component, pageProps }: AppProps) => {

  
	return <Component {...pageProps} />;
}

export default MyApp;
