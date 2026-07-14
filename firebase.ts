import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeGHK2b0s-SgWygthoMN1nXWnJUDawzZ8",
  authDomain: "fike-collections.firebaseapp.com",
  projectId: "fike-collections",
  storageBucket: "fike-collections.firebasestorage.app",
  messagingSenderId: "259559243385",
  appId: "1:259559243385:web:8d60bdd07b24f746295ea8",
};

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);