import React, { createContext,useState, useEffect } from "react";
import * as firebase from "firebase";


import { loginRequest } from "./authentication.services";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState([]);


    firebase.auth().onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
            setIsLoading(false);
        }else {
            setIsLoading(false);
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password)
        .then((u)=>{
            setUser(u);
            isLoading(false)
        }).catch((e)=>{
            setIsLoading(false);
            setError(e.toString());
        })
    }


    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if(password !== repeatedPassword){
            setError("Error: Passwords don not match");
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((u)=> {
            setUser(u);
            setIsLoading(false);
        }).catch((e)=> {
            setIsLoading(false);
            setError(e.toString());
        });
    }

    const onLogout = () => {
        setUser(null);
        firebase.auth().signOut();
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated : !!user,
                user,
                isLoading,
                error,
                onLogin:onLogin,
                onRegister:onRegister,
                onLogout:onLogout,
            }}
        >
            { children }
        </AuthenticationContext.Provider>
    )   
}