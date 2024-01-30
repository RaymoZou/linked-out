import LoggedOut from './components/LoginPage.js';
import Navbar from './components/Navbar';
import PostCreationBar from './components/MainFeed';
import PostContainer from './components/PostContainer';
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useEffect, createContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const UserContext = createContext(null);

function App() {

	useEffect(() => {
		document.title = "LinkedOut";
	})

	const [user] = useAuthState(auth);

	return (
		<div>
			{user ?
				<UserContext.Provider value={user}>
					<LoggedIn />
				</UserContext.Provider>
				:
				<LoggedOut />}
		</div>
	)
}

function LoggedIn() {

	useEffect(() => console.log("jwt cookie:", localStorage.getItem("jwt")))

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
