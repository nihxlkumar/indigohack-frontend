import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "2-2",
  authDomain: "indigo-hack-2.firebaseapp.com",
  projectId: "indigo-hack-2",
  storageBucket: "indigo-hack-2.appspot.com",
  messagingSenderId: "2",
  appId: "1:22:web:2",
  measurementId: "G-2"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
