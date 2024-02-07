import LoginPage from './components/LoginPage.js';
import Navbar from './components/Navbar';
import PostCreationBar from './components/MainFeed';
import PostContainer from './components/PostContainer';
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useEffect, createContext, useState } from "react";
import axios from 'axios';

// configure base url for axios
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const UserContext = createContext(null);

// TODO: fix the inconsistent rendering (has something to do with when setUser and setLoginStatus)
function App() {

    // user object contains the following fields:
    // username: unique identifier string for the user
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.title = "LinkedOut";

        async function validateJWT() {
            try {
                const res = await axios.get('/protected-route', { withCredentials: true });
                if (res.status === 200) setUser({ username: res.data.username });
            } catch (error) {
                console.error("error validating jwt");
            }
        };

        validateJWT();
    }, [])

    return (
        <div>
            {user ? <LoggedIn setUser={setUser} /> : <LoginPage setUser={setUser} />}
        </div>
    )
}

function LoggedIn({ setUser }) {

    async function logout() {
        const res = await axios.get('/logout', { withCredentials: true });
        if (res.status === 200) setUser(null);
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
