import LoginPage from './components/LoginPage.js';
import Navbar from './components/Navbar';
import PostCreationBar from './components/PostCreationBar.js';
import PostContainer from './components/PostContainer';
import { useEffect, createContext, useState } from "react";
import axios from 'axios';

// configure base url for axios
// manually set to gh-pages homepage on deployment
// TODO: find a way to automate the above
// axios.defaults.baseURL = 'http://localhost:3001'; // uncomment for development
axios.defaults.baseURL = 'https://linked-out.onrender.com/'; // uncomment for development

export const UserContext = createContext(null);

function App() {

    // user object contains the following fields:
    // username: unique identifier string for the user
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "LinkedOut";

        async function validateJWT() {
            try {
                const res = await axios.get('/protected-route', { withCredentials: true });
                if (res.status === 200) setUser({ username: res.data.username });
                setLoading(false);
            } catch (error) {
                console.error("error validating jwt");
                setLoading(false);
            }
        };

        validateJWT();
    }, [])

    if (loading) {
        return null;
    }

    return (
        <div className="bg-lightbeige min-h-screen">
            {user && !loading ? <LoggedIn setUser={setUser} /> : <LoginPage setUser={setUser} />}
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
            <div className='flex flex-col px-16 py-8 gap-4'>
                <PostCreationBar />
                <PostContainer />
            </div>
        </>
    )
}

export default App;
