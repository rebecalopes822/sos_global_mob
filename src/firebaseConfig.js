import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZF5iMysuCpFvNZAieT7TUmdaPakey8f0",
  authDomain: "supernova-app-2.firebaseapp.com",
  projectId: "supernova-app-2",
  storageBucket: "supernova-app-2.appspot.com", 
  messagingSenderId: "443682240110",
  appId: "1:443682240110:web:30bf1cd26bf887b9c7587f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
