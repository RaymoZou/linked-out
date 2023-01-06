import LoggedOut from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Asidebar from './components/Asidebar';
import Overlay from './components/Overlay'

import styles from './styles/App.module.css';

import { useState, createContext } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC-NbO8dXul0fZCrWbbm--FPIJimcMpuLI',
  authDomain: 'linkedout-31478.firebaseapp.com',
  projectId: 'linkedout-31478',
  storageBucket: 'linkedout-31478.appspot.com',
  messagingSenderId: '148185206353',
  appId: '1:148185206353:web:d946bd67a572fd710df270'
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const UserContext = createContext(null);

function App() {

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

  const [isOverlayOn, setOverlay] = useState(false);

  const signOut = () => auth.signOut();

  async function uploadPost(postDataObject) {
    try {
      const docRef = await addDoc(collection(db, "users"), postDataObject);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  async function readPosts() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.docs.forEach((doc) => {
      // console.log(doc.data());
    })
  }

  readPosts();

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar signOut={signOut}></Navbar>
        <div className={styles.scaffoldContainer}>
          <Sidebar />
          <MainFeed setOverlay={setOverlay} />
          <Asidebar />
        </div>
      </div>
      <Overlay
        isOpen={isOverlayOn}
        setOverlay={setOverlay}
        uploadPost={uploadPost}
      />
    </>
  )
}

export default App;
