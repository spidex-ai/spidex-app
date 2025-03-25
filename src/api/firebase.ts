import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnaNohZ93r236p7cSeHbu0dx4eJDgddOQ",
  authDomain: "cai-dev-c3823.firebaseapp.com",
  projectId: "cai-dev-c3823",
  storageBucket: "cai-dev-c3823.firebasestorage.app",
  messagingSenderId: "678864531734",
  appId: "1:678864531734:web:3ae4e866ca73a7d0016037",
  measurementId: "G-H5H351406G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseAuth = getAuth(app);
export { app, analytics, firebaseAuth };
