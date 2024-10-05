// src/Login.js
import React, { useContext, useState } from 'react'
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { MyContext } from "../context/UserContex";
import {addUserWithId} from '../firebase/crudfun.js/writeData';
import { Navigate } from 'react-router-dom';


const Login = () => {
  const { user } = useContext(MyContext);
  const [isloding, setisloding] = useState(false); 

  const signInWithGoogle = async () => {
    setisloding(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      addUserWithId(user);
     
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
    setisloding(false);
  };

  return (
    <div>
    
      {
        user && <Navigate to="/" />
      }
      <h1>Login</h1>
      <button onClick={()=>{
        signInWithGoogle();
       
      }}>{
        isloding ? "Loading..." : "Sign in with Google"
        }</button>
    </div>
  );
};

export default Login;
