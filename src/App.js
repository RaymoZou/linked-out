import LoggedOut from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Asidebar from './components/Asidebar';
import Overlay from './components/Overlay'

import styles from './styles/App.module.css';

import { useState, useEffect, createContext } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection, getFirestore, query, orderBy, limit, serverTimestamp, getDocs, getDoc, onSnapshot } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

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
      {user && UserContext ?
        <UserContext.Provider value={user}>
          <LoggedIn />
        </UserContext.Provider>
        :
        <LoggedOut signInMethod={signInWithGoogle} />}
    </div>
  )
}

function LoggedIn() {

  const postCollectionRef = collection(db, "posts");

  const [isOverlayOn, setOverlay] = useState(false);
  const q = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(20));
  const [posts] = useCollection(q, {id: 'testing'});

  async function uploadPost(name, photoURL, postText) {
    await addDoc(postCollectionRef, {
      name: name,
      photoURL: photoURL,
      postText: postText,
      createdAt: serverTimestamp(),
    })
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar signOut={() => auth.signOut()}></Navbar>
        <div className={styles.scaffoldContainer}>
          <Sidebar />
          {posts ? <MainFeed setOverlay={setOverlay} docs={posts.docs}/> : null}
          <Asidebar />
        </div>
      </div>
      <Overlay
        isOpen={isOverlayOn}
        setOverlay={setOverlay}
        uploadPost={uploadPost} />
    </>
  )
}

export default App;
