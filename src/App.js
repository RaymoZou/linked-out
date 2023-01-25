import LoggedOut from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostCreationBar from './components/MainFeed';
import Asidebar from './components/Asidebar';
import PostInputContainer from './components/Overlay'
import PostContainer from './components/PostContainer';

import styles from './styles/App.module.css';

import { useState, createContext } from 'react';

import { firebaseConfig } from './firebase.config';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
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
import { useEffect } from "react";


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
const postCollectionRef = collection(db, "posts");

export const UserContext = createContext(null);


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

  const [isOverlayOn, setOverlay] = useState(false);
  const q = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(20));
  const [posts] = useCollection(q);

  function uploadPost(name, photoURL, postText, uid, postImgURL, imgName) {
    addDoc(postCollectionRef, {
      name: name,
      photoURL: photoURL,
      postText: postText,
      createdAt: serverTimestamp(),
      uid: uid,
      postImgURL: postImgURL,
      imgName: imgName
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
