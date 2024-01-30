import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: need to replace auth with jwt sessions
import { auth } from "../App";

async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	// TODO: replace this with passport authentication
	const user = await signInWithPopup(auth, provider);
	console.log(user)
}


export default function LoginPage(props) {
	return (
		<>
			<div className='flex justify-center items-center flex-col bg-blue-100 h-screen gap-5'>
				<h1 className="text-5xl">LinkedOut</h1>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={signInWithGoogle}>Login with Google</button>
			</div>
		</>
	)
}
