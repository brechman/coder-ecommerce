import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";

import App from './App.jsx'
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyBoF2peNwggD5xAR5r1ciLeKtAH5LJXpiU",
  authDomain: "ecommerce-coder-f2d01.firebaseapp.com",
  projectId: "ecommerce-coder-f2d01",
  storageBucket: "ecommerce-coder-f2d01.appspot.com",
  messagingSenderId: "179564335808",
  appId: "1:179564335808:web:a8a96232ddabd5df915325"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
 
 <React.StrictMode>
    <App />
  </React.StrictMode>,
)
