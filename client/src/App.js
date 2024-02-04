import LoginPage from './components/LoginPage.js';
import Navbar from './components/Navbar';
import PostCreationBar from './components/MainFeed';
import PostContainer from './components/PostContainer';
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useEffect, createContext, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const UserContext = createContext(null);


// TODO: remove this test user
const testUser = { username: "jason", photoURL: null }

function App() {

    // user object contains the following fields:
    // username: unique identifier string for the user
    const [user, setUser] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        document.title = "LinkedOut";

        async function validateJWT() {
            const user = await axios.get('http://localhost:3001/protected-route', { withCredentials: true });
            setUser(testUser);
            setLoginStatus(user.status === 200);
        };

        validateJWT();
    }, [])

    return (
        <div>
            {loginStatus ?
                <UserContext.Provider value={user}>
                    <LoggedIn setLoginStatus={setLoginStatus} />
                </UserContext.Provider>
                :
                <LoginPage setLoginStatus={setLoginStatus} />}
        </div>
    )
}

function LoggedIn({ setLoginStatus }) {

    // TODO: this only sets the view of the user being logged out (user will still be logged in as long as jwt is valid)

    async function logout() {
        const res = await axios.get('http://localhost:3001/logout', { withCredentials: true });
        if (res.status === 200) setLoginStatus(false);
    };

    return (
        <>
            <Navbar signOut={logout}></Navbar>
            <div className='mx-64 bg-rose-50'>
                <PostCreationBar />
                <PostContainer />
            </div>
        </>
    )
}

export default App;
