import axios from "axios";
import { useState } from "react";

export default function LoginPage({ setUser }) {

    // login screen by default
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    async function login(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const res = await axios.post(`/login`, { username, password }, { withCredentials: true });
        if (res.status === 200) setUser({ username });
    }

    async function signup(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const res = await axios.post(`/signup`, { username, password }, { withCredentials: true });
        if (res.status === 200) setUser({ username });
    }

    return (
        <div className='flex justify-center items-center flex-col h-screen gap-5'>
            <div> {isLoggingIn ? "Log in" : "Sign up"} </div>
            <form onSubmit={isLoggingIn ? login : signup} className="flex flex-col gap-2">
                <input id="username" type="text" placeholder="username" className="p-2 rounded outline-none" autoComplete="on" required/>
                <input id="password" type="password" placeholder="password" className="p-2 rounded outline-none" autoComplete="on" required/>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >{isLoggingIn ? "Login" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLoggingIn(!isLoggingIn)}>{isLoggingIn
                ? "Don't have an account yet? Sign Up!"
                :
                "Already have an account? Sign In!"}
            </button>
        </div>
    )
}
