import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // signed up
        const user = userCredential.user;
        console.log("Created User", user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user", errorCode, errorMessage);
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // signed in
        const user = userCredential.user;
        console.log("User logged in:", user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in user", errorCode, errorMessage);
    }
}

async function logout() {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging out user", errorCode, errorMessage);
    }
}
