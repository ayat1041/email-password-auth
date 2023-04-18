// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF9b8y5UPIEb5IYnZEQDGNxrmVv2eyH5U",
  authDomain: "email-password-auth-a22dd.firebaseapp.com",
  projectId: "email-password-auth-a22dd",
  storageBucket: "email-password-auth-a22dd.appspot.com",
  messagingSenderId: "146358046012",
  appId: "1:146358046012:web:8aeaa528b73172bb8e6239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;