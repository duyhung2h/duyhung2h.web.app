import { User } from "../model/User";
import React from "react";

export function login(username: string, password: string){
    const user = new User(1, username, password)
    localStorage.setItem('user', JSON.stringify(user))
}
export function logout(){
    localStorage.removeItem('user')
}
export function getUserLocalstorage(){
    let user: any
    try{
        user = JSON.parse(localStorage["user"])
    }catch{
        user = new User(-1, "guest", "password")
    }
    return user
}

var AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;