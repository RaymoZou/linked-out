import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LoginPage() {

    // TODO: temp state for tracking login status
    const [loggedIn, setLoggedIn] = useState(false);

    // TODO: need to replace auth with jwt sessions
    async function login(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const res = await axios.post(`http://localhost:3001/login`, { username, password }, { withCredentials: true });
        if (res.status === 200) {
            setLoggedIn(true);
        } else {
            // login failure
            console.log("there was a login error")
        }
    }


    useEffect(() => {
        async function getData() {
            const res = await axios.get('http://localhost:3001/protected-route', { withCredentials: true });
            console.log(res.data);
        }
        getData();
    }, [])

    return (
        <div className='flex justify-center items-center flex-col bg-blue-100 h-screen gap-5'>
            <div>
                {loggedIn ? "logged in" : "not logged in"}
            </div>
            <form onSubmit={login} className="flex flex-col gap-2">
                <input id="username" type="text" placeholder="username" className="p-2 rounded outline-none" autoComplete="on" />
                <input id="password" type="password" placeholder="password" className="p-2 rounded outline-none" autoComplete="on" />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Login</button>
            </form>
        </div>
    )
}
