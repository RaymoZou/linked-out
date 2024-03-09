import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import PostCreationBar from './components/PostCreationBar';
import PostContainer from './components/PostContainer';
import { useEffect, createContext, useState } from "react";
import axios from 'axios';
import Footer from './components/Footer';

// configure base url for axios
// manually set to gh-pages homepage on deployment
// TODO: find a way to automate the above
// axios.defaults.baseURL = 'http://localhost:3001'; // uncomment for development
axios.defaults.baseURL = 'https://linked-out-production.up.railway.app/'; // uncomment for deployment

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

    async function logout() {
        console.log("logging out");
        const res = await axios.get('/logout', { withCredentials: true });
        if (res.status === 200) setUser(null);
    };

    if (loading) {
        return null;
    }

    return (
        <>
            <div className="bg-indigo-100 ">
                {user ?
                    <UserContext.Provider value={user}>
                        <Navbar signOut={logout}></Navbar>
                        <div className='flex flex-col px-16 py-8 gap-4'>
                            <PostCreationBar />
                            <PostContainer />
                        </div>
                    </UserContext.Provider>
                    :
                    <LoginPage setUser={setUser} />}
            </div>
            <Footer />
        </>
    )
}

export default App;
