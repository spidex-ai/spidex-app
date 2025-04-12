import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwiC444_f2cxPMPe64e8kP1YcJaU3lQAk",
  authDomain: "spidex-30c14.firebaseapp.com",
  projectId: "spidex-30c14",
  storageBucket: "spidex-30c14.firebasestorage.app",
  messagingSenderId: "282546013060",
  appId: "1:282546013060:web:add445901b2df7f6d8d3d1",
  measurementId: "G-Y8ZV0KCHL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseAuth = getAuth(app);
export { app, analytics, firebaseAuth };
