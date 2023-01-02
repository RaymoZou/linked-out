import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsRoundedIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';

import Homepage from './Homepage';
import styles from './App.module.css';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC-NbO8dXul0fZCrWbbm--FPIJimcMpuLI",
  authDomain: "linkedout-31478.firebaseapp.com",
  projectId: "linkedout-31478",
  storageBucket: "linkedout-31478.appspot.com",
  messagingSenderId: "148185206353",
  appId: "1:148185206353:web:d946bd67a572fd710df270"
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
      {user ? <MainFeed/> : <Homepage signInMethod={signInWithGoogle} />}
    </div>
  )
}

function MainFeed() {
  return (
    <>
      <div className={styles["nav-bar"]}>
        <div className={styles["search-bar-container"]}>
          <div className={styles["logo"]}>Out</div>
          <input className={styles["search-bar"]} placeholder="Search"></input>
        </div>
        <div className={styles["nav-button-container"]}>
          <div className={styles["nav-button"]}><HomeIcon />Home</div>
          <div className={styles["nav-button"]}><GroupIcon />My Network</div>
          <div className={styles["nav-button"]}><BusinessCenterIcon />Jobs</div>
          <div className={styles["nav-button"]}><TextsmsIcon />Messaging</div>
          <div className={styles["nav-button"]}><NotificationsRoundedIcon />Notifications</div>
          <div className={styles["nav-button"]}><img alt="profile_pic" src={auth.currentUser.photoURL}/>Me</div>
          <div className={styles["nav-button"]}><AppsIcon />Work</div>
          <div className={styles["nav-button"]}><AutoStoriesIcon />Learning</div>
        </div>
      </div>
      <div>Welcome back, {auth.currentUser.displayName}!</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}

export default App;
