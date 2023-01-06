import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Asidebar from './components/Asidebar';
import Overlay from './components/Overlay'

import styles from './styles/App.module.css';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC-NbO8dXul0fZCrWbbm--FPIJimcMpuLI',
  authDomain: 'linkedout-31478.firebaseapp.com',
  projectId: 'linkedout-31478',
  storageBucket: 'linkedout-31478.appspot.com',
  messagingSenderId: '148185206353',
  appId: '1:148185206353:web:d946bd67a572fd710df270'
})

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

function signOut() { auth.signOut() };

function App() {

  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? <AppOut profilePicture={user.photoURL} /> : <Homepage signInMethod={signInWithGoogle} />}
    </div>
  )
}

function AppOut() {

  const { photoURL, displayName } = auth.currentUser;

  const [isOverlayOn, setOverlay] = useState(false);

  async function uploadPost(postDataObject) {
    try {
      const docRef = await addDoc(collection(db, "users"), postDataObject);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  async function readPosts() {
    // const docRef = doc(db, "users", "3oJP4DWpVBgy5jj8hyAP");
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log(docSnap.data());
    // } else {
    //   console.log('no such document!');
    // }
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.data());
    })
  }

  readPosts();

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar photoURL={photoURL} signOut={signOut}></Navbar>
        <div className={styles.scaffoldContainer}>
          <Sidebar photoURL={photoURL} displayName={displayName} />
          <MainFeed photoURL={photoURL} setOverlay={setOverlay} />
          <Asidebar />
        </div>
      </div>
      <Overlay
        isOpen={isOverlayOn}
        setOverlay={setOverlay}
        displayName={displayName}
        photoURL={photoURL}
        uploadPost={uploadPost}
      />
    </>
  )
}

export default App;
