import { User } from "../model/User";

export function login(username: string, password: string){
    const user = new User(1, username, password)
    localStorage.setItem('user', JSON.stringify(user))
}
export function logout(){
    localStorage.removeItem('user')
}