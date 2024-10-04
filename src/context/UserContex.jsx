import React, { createContext, useState,  useEffect } from "react";
import {auth} from "../firebase/firebase"
// Create the context
const MyContext = createContext();

const MyProvider = ({ children }) => {
    // Define the state or values you want to share
    const [user, setUser] = useState(null);
    const [isuser, setisUser] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            if(user){
                setisUser(true);
            }
        });
    }, []);
  
    return (
      <MyContext.Provider value={{ user, setUser, setisUser, isuser }}>
        {children}
      </MyContext.Provider>
    );
  };

export { MyContext, MyProvider };
  