import './App.css';
import Explore from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

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
  // signInWithPopup(auth, provider).then((result) => {
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   const user = result.user;
  // })
}

function signOut() { auth.signOut() };

function App() {

  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? <MainFeed /> : <Homepage />}
    </div>
  )
}

function Homepage() {
  return (
    <>
      <div className="nav-bar">
        <div className="header">Linked<span>out</span></div>
        <div className="button-container">
          <div className="header-button"><Explore />Discover</div>
          <div className="header-button"><GroupIcon />People</div>
          <div className="header-button"><SchoolIcon />Learning</div>
          <div className="header-button"><BusinessCenterIcon />Jobs</div>
          <div className="login-container">
            <button className="join-button">Join now</button>
            <button className="login-button" onClick={signInWithGoogle}>Sign in</button>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="left-col">
          <div class="content-header">Welcome to your unprofessional community</div>
          <form>
            <div className="login-form">
              <input type="text" placeholder="Email or phone number" />
              <br></br>
              <input type="password" placeholder="Password" />
              <a href="#/" className="forgot-password">Forgot password?</a>
            <button className="form-signin-button">Sign in</button>
            <hr />
            <button className="form-google-signin-button" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
          </form>
        </div>
        <div className="right-col">
          <img src="https://img.freepik.com/free-vector/telecommuting-concept-illustration_114360-1600.jpg?w=1380&t=st=1672614610~exp=1672615210~hmac=76a3caf92f0060bf7f2d278f565ba4ecf3d68a728db0f0201adeaa55595ab5ec" alt="worker" />
          <a href="https://www.freepik.com/free-vector/telecommuting-concept-illustration_7321334.htm#query=working&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik
        </div>
      </div>
    </>
  )
}

function MainFeed() {
  return (
    <>
      <div>Welcome back, {auth.currentUser.displayName}!</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}

export default App;
