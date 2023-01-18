// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdSoNz_qVC5No8UjmZuHpAz6CA55a3aQE",
    authDomain: "crud-project-24ed2.firebaseapp.com",
    databaseURL: "https://crud-project-24ed2-default-rtdb.firebaseio.com",
    projectId: "crud-project-24ed2",
    storageBucket: "crud-project-24ed2.appspot.com",
    messagingSenderId: "577664166549",
    appId: "1:577664166549:web:4baab203ecfb3d7e15899c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getFirestore(app)