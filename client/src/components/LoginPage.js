import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";

// async function signInWithGoogle() {
// 	const provider = new GoogleAuthProvider();
// 	// TODO: replace this with passport authentication
// 	await signInWithPopup(auth, provider);
// }


export default function LoginPage() {

	// TODO: temp state for tracking login status
	const [loggedIn, setLoggedIn] = useState(false);

	// TODO: need to replace auth with jwt sessions
	async function login(e) {
		e.preventDefault();
		const username = e.target.username.value
		const password = e.target.password.value
		const res = await axios.post(`http://localhost:3001/login`, { username, password });
		if (res.status === 200) {
			// login success
			setLoggedIn(true)
		} else {
			// login failure
		}
	}

	return (
		<div className='flex justify-center items-center flex-col bg-blue-100 h-screen gap-5'>
			{/* <h1 className="text-5xl">LinkedOut</h1> */}
			{/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={signInWithGoogle}>Login with Google</button> */}
			{/* TODO: remove */}
			<div>
				{loggedIn ? "logged in" : "not logged in"}
			</div>
			<form onSubmit={login} className="flex flex-col gap-2">
				<input id="username" type="text" placeholder="username" className="p-2 rounded outline-none" />
				<input id="password" type="password" placeholder="password" className="p-2 rounded outline-none" />
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Login</button>
			</form>
		</div>
	)
}
