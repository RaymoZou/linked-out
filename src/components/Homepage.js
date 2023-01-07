import Explore from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import styles from '../styles/Homepage.module.css';

export default function Homepage(props) {
    return (
        <>
            <div className={styles.homepage}>
                <div className={styles.navBar}>
                    <div className={styles.header}>Linked<span>out</span></div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.headerButton}><Explore />Discover</div>
                        <div className={styles.headerButton}><GroupIcon />People</div>
                        <div className={styles.headerButton}><SchoolIcon />Learning</div>
                        <div className={styles.headerButton}><BusinessCenterIcon />Jobs</div>
                        <div className={styles.loginContainer}>
                            <button className={styles.joinButton}>Join now</button>
                            <button className={styles.loginButton} onClick={props.signInMethod}>Sign in</button>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftCol}>
                        <div className={styles.contentHeader}>Welcome to your unprofessional community</div>
                        <form>
                            <div className={styles.loginForm}>
                                <input type="text" placeholder="Email or phone number" />
                                <br></br>
                                <input type="password" placeholder="Password" autoComplete="on"/>
                                <a href="#/" className={styles.forgotPassword}>Forgot password?</a>
                                <button className={styles.formSignInButton}>Sign in</button>
                                <hr className={styles.divider} />
                                <button className={styles.formGoogleSignInButton} onClick={props.signInMethod}>Sign in with Google</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.rightCol}>
                        <img src="https://img.freepik.com/free-vector/telecommuting-concept-illustration_114360-1600.jpg?w=1380&t=st=1672614610~exp=1672615210~hmac=76a3caf92f0060bf7f2d278f565ba4ecf3d68a728db0f0201adeaa55595ab5ec" alt="worker" />
                        <a href="https://www.freepik.com/free-vector/telecommuting-concept-illustration_7321334.htm#query=working&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik
                    </div>
                </div>
            </div>
        </>
    )
}