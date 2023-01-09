import LoggedOut from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostCreationBar from './components/MainFeed';
import Asidebar from './components/Asidebar';
import PostInputContainer from './components/Overlay'
import PostContainer from './components/PostContainer';

import styles from './styles/App.module.css';

import { useState, createContext, useContext } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

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
const postCollectionRef = collection(db, "posts");

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
  const q = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(20));
  const [posts] = useCollection(q);

  async function uploadPost(name, photoURL, postText, uid) {
    await addDoc(postCollectionRef, {
      name: name,
      photoURL: photoURL,
      postText: postText,
      createdAt: serverTimestamp(),
      uid: uid,
    })
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar signOut={() => auth.signOut()}></Navbar>
        <div className={styles.scaffoldContainer}>
          <Sidebar />
          <MidContainer>
            <PostCreationBar setOverlay={setOverlay} />
            <PostContainer posts={posts} />
          </MidContainer>
          <Asidebar />
        </div>
      </div>
      <PostInputContainer isOpen={isOverlayOn} setOverlay={setOverlay} uploadPost={uploadPost} />
    </>
  )
}

function MidContainer(props) {
  return <div className={styles.scaffoldMain}> {props.children}
  </div>
}

export default App;
