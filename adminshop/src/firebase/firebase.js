// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-Wk4gRAnnXihgxbQ9Xe7FlbWFh4GhHbQ',
  authDomain: 'mock2-uploadimg.firebaseapp.com',
  projectId: 'mock2-uploadimg',
  storageBucket: 'mock2-uploadimg.appspot.com',
  messagingSenderId: '637299075914',
  appId: '1:637299075914:web:ef395e3eeefa7ffe912fb3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
