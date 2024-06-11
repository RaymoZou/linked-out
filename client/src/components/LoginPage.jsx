import axios from "axios";
import { useState } from "react";

export default function LoginPage({ setUser }) {

    // login screen by default
    const [isLogin, setIsLogin] = useState(true);

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
        <div className={`flex justify-center items-center flex-col h-screen gap-5 ${isLogin ? 'bg-blue-100' : 'bg-indigo-100'}`}>
            <div className="text-xl font-bold"> LinkedOut </div>
            <form onSubmit={isLogin ? login : signup} className="flex flex-col gap-2">
                <input id="username" type="text" placeholder="username" className="p-2 rounded outline-none" autoComplete="on" required />
                <input id="password" minlength="8" type="password" placeholder="password" className="p-2 rounded outline-none" autoComplete="on" required />
                {isLogin ?
                    <button className="transition bg-blue-500 hover:bg-blue-600 text-lg text-white font-bold p-2 rounded">Login</button>
                    :
                    <button className="transition bg-indigo-500 hover:bg-indigo-600 text-lg text-white font-bold p-2 rounded">Sign Up</button>}

            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin
                ?
                <div> Don't have an account yet?<span className="transition text-indigo-500 hover:text-indigo-700 font-bold"> Sign Up!</span> </div>
                :
                <div> Already have an account?<span className="transition text-blue-500 hover:text-blue-700 font-bold"> Login!</span> </div>}
            </button>
        </div>
    )
}
