import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBw-X9k1FxEgu8qKEZaj-JnnsEvLl78wMY",
    authDomain: "lab4-auth-team4.firebaseapp.com",
    projectId: "lab4-auth-team4",
    storageBucket: "lab4-auth-team4.firebasestorage.app",
    messagingSenderId: "627453371435",
    appId: "1:627453371435:web:b4cfa344c0233381d6b66e"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export async function loginUser (email: string, password: string) {
    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log("Logged in: ", user);
        return true;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
        return false;
    }
};

export async function registerUser(email: string, password: string) {
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log("User Registered: ", user);
        return true;

    } catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage)
        return false;
    }
};