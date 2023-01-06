import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Asidebar from './components/Asidebar';
import Overlay from './components/Overlay'

import styles from './styles/App.module.css';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
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
      />
    </>
  )
}

export default App;
