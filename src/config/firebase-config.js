import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1H32VGFbbL22iGX4DPLyrv9PQS0mbH5k",
  authDomain: "cofounder-matcher.firebaseapp.com",
  projectId: "cofounder-matcher",
  storageBucket: "cofounder-matcher.appspot.com",
  messagingSenderId: "478906187518",
  appId: "1:478906187518:web:baf298cc3cd1130ba86faf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);