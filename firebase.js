import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD6BvJXJwyVIHdUBYnVurzYswUxYFvSzw",
  authDomain: "parallax-humanoid.firebaseapp.com",
  projectId: "parallax-humanoid",
  storageBucket: "parallax-humanoid.appspot.com",
  messagingSenderId: "732705533260",
  appId: "1:732705533260:web:99cb031f23ecad05a1b3e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export default app