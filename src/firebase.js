import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCtWar09Jcq8-9ZoobzoFw1ZWJIxZeGgC4",
  authDomain: "indigo-hack-b1061.firebaseapp.com",
  projectId: "indigo-hack-b1061",
  storageBucket: "indigo-hack-b1061.appspot.com",
  messagingSenderId: "396118267828",
  appId: "1:396118267828:web:682c1007cc5ad2fcfb44e1",
  measurementId: "G-LXWDZ9S4TB"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);