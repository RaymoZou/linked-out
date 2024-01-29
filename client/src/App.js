import LoggedOut from './components/Homepage';
import Navbar from './components/Navbar';
import PostCreationBar from './components/MainFeed';
import PostContainer from './components/PostContainer';
import { createContext } from 'react';
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection, getFirestore, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const UserContext = createContext(null);
// export const storage = getStorage(firebaseApp)
// export const db = getFirestore(firebaseApp);


function App() {

	useEffect(() => {
		document.title = "LinkedOut";
	})

	const [user] = useAuthState(auth);

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	}

	return (
		<div>
			{user ?
				<UserContext.Provider value={user}>
					<LoggedIn />
				</UserContext.Provider>
				:
				<LoggedOut signInMethod={signInWithGoogle} />}
		</div>
	)
}

function LoggedIn() {

	useEffect(() => console.log(localStorage.getItem("jwt")))

	return (
		<>
			<Navbar signOut={() => auth.signOut()}></Navbar>
			<div className='mx-64 bg-rose-50'>
				<PostCreationBar />
				<PostContainer />
			</div>
		</>
	)
}

export default App;
