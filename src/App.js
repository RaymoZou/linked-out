import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/Group';
import SuitcaseIcon from '@mui/icons-material/BusinessCenter';
import ChatBubbleIcon from '@mui/icons-material/Textsms';
import BellIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';
import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoIcon from '@mui/icons-material/SmartDisplay';
import CalendarIcon from '@mui/icons-material/Today';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import Homepage from './Homepage';
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
      {user ? <MainFeed profilePicture={user.photoURL} /> : <Homepage signInMethod={signInWithGoogle} />}
    </div>
  )
}

function MainFeed() {

  const { photoURL, displayName } = auth.currentUser;

  console.log(auth.currentUser.photoURL);
  return (
    <>
      <div className={styles['main-container']}>
        <div className={styles['nav-bar']}>
          <div className={styles['search-bar-container']}>
            <div className={styles['logo']}>out</div>
            <input className={styles['search-bar']} placeholder='Search'></input>
          </div>
          <div className={styles['nav-button-container']}>
            <div className={styles['nav-button']}><HomeIcon />Home</div>
            <div className={styles['nav-button']}><PeopleIcon />My Network</div>
            <div className={styles['nav-button']}><SuitcaseIcon />Jobs</div>
            <div className={styles['nav-button']}><ChatBubbleIcon />Messaging</div>
            <div className={styles['nav-button']}><BellIcon />Notifications</div>
            <div className={styles['nav-button']}><img alt='profile_pic' src={photoURL} />Me</div>
            <div className={styles['nav-button']}><AppsIcon />Work</div>
            <div className={styles['nav-button']}><AutoStoriesIcon />Learning</div>
          </div>
        </div>
        <div>Welcome back, {auth.currentUser.displayName}!</div>
        <button onClick={signOut}>Sign Out</button>
        <div className={styles['scaffold-container']}>
          <div className={[styles.outline, styles['scaffold-sidebar']].join(' ')}>
            <div className={styles['wrapper']}>
              <div className={styles['sidebar-background-img']}>
                <img src={
                  photoURL ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                } alt='profile_pic' />
              </div>
            </div>
            <div className={styles['sidebar-text']}>
              <div className={styles['sidebar-header']}>{displayName}</div>
              <div className={styles['button-container']}>
                <div className={styles['sidebar-button']}>
                  <div>Connections</div>
                  <div>42</div>
                </div>
                <div className={styles['sidebar-button']}>
                  <div>Who's viewed your profile</div>
                  <div className={styles['profile-view-count']}>502</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['scaffold-main']}>
            <div className={styles['main-input']}>
              <div className={styles['top-container']}>
                <img src={photoURL} alt="profile_pic" />
                <button className={styles['post-button']}>Start a post</button>
              </div>
              <div className={styles['icon-bar']}>
                <div className={[styles["post-icon"], styles["photo-icon"]].join(' ')}>
                  <PhotoIcon />
                  <span className={styles["icon-text"]}>Photo</span>
                </div>
                <div className={[styles["post-icon"], styles["video-icon"]].join(' ')}>
                  <VideoIcon />
                  <span className={styles["icon-text"]}>Video</span>
                </div>
                <div className={[styles["post-icon"], styles["event-icon"]].join(' ')}>
                  <CalendarIcon />
                  <span className={styles["icon-text"]}>Event</span>
                </div>
                <div className={[styles["post-icon"], styles["newspaper-icon"]].join(' ')}>
                  <NewspaperIcon />
                  <span className={styles["icon-text"]}>Write Article</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['scaffold-aside']}></div>
        </div>
      </div>
    </>
  )
}

export default App;
