import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIw3uj14HzMboNDQZ-9W726k_WEQZCq50",
  authDomain: "grannell-cottage.firebaseapp.com",
  projectId: "grannell-cottage",
  storageBucket: "grannell-cottage.firebasestorage.app",
  messagingSenderId: "89494587580",
  appId: "1:89494587580:web:46e663599bd1bc52cfe8b9",
  measurementId: "G-B1G5JF4JX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);