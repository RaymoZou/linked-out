import SignIn from './SignIn';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
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

function signOut() {auth.signOut()};

function App() {

  const [user] = useAuthState(auth);

  return(
    <div>
    {user ? <MainFeed/> : <SignIn signInMethod={signInWithGoogle}/>}
  </div>
  )
}

function MainFeed() {

  console.log(auth.currentUser);

  useEffect(() => {
    console.log('use effect called') 
  })

  return (
    <>
      <div>Welcome to LinkedOut!</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}

export default App;
