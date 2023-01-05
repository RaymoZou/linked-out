import Homepage from './Homepage';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainFeed from './MainFeed';
import Asidebar from './Asidebar'

import styles from './App.module.css';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

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

  console.log(auth.currentUser.photoURL);
  return (
    <>
      <div className={styles['main-container']}>
        <Navbar photoURL={photoURL}></Navbar>
        <div>Welcome back, {auth.currentUser.displayName}!</div>
        <button onClick={signOut}>Sign Out</button>
        <div className={styles['scaffold-container']}>
          <Sidebar photoURL={photoURL} displayName={displayName} />
          <MainFeed photoURL={photoURL}/>
          <Asidebar />
        </div>
      </div>
    </>
  )
}

export default App;
