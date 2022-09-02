import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB9ZakNVI1mCRHySAr8QO2IRywkDNinXds',
    authDomain: 'ignite-lab-react.firebaseapp.com',
    projectId: 'ignite-lab-react',
    storageBucket: 'ignite-lab-react.appspot.com',
    messagingSenderId: '387888757203',
    appId: '1:387888757203:web:af7abae9c5016dbd6b9726',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const firebaseAuth = getAuth(app);
