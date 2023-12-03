import Explore from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

// import temp_styles from '../styles/Homepage.module.css';
import styles from '../index.css';

export default function Homepage(props) {
    return (
        <>
            <div className='flex justify-center items-center flex-col bg-blue-100 h-screen gap-5'>
                <h1 className="text-5xl">LinkedOut</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={props.signInMethod}>Login with Google</button>
            </div>           {/* <div>
                <div >Linked<span>out</span></div>
                <div >
                    <div ><Explore />Discover</div>
                    <div ><GroupIcon />People</div>
                    <div ><SchoolIcon />Learning</div>
                    <div ><BusinessCenterIcon />Jobs</div>
                    <div >
                        <button >Join now</button>
                        <button onClick={props.signInMethod}>Sign in</button>
                    </div>
                </div>
            </div>
            <div >
                <div >
                    <div >Welcome to your unprofessional community</div>
                    <form>
                        <div >
                            <input type="text" placeholder="Email or phone number" />
                            <br></br>
                            <input type="password" placeholder="Password" autoComplete="on" />
                            <a href="#/" >Forgot password?</a>
                            <button >Sign in</button>
                            <hr />
                            <button type="button" onClick={props.signInMethod}>Sign in with Google</button>
                        </div>
                    </form>
                </div>
                <div >
                    <img src="https://img.freepik.com/free-vector/telecommuting-concept-illustration_114360-1600.jpg?w=1380&t=st=1672614610~exp=1672615210~hmac=76a3caf92f0060bf7f2d278f565ba4ecf3d68a728db0f0201adeaa55595ab5ec" alt="worker" />
                    <a href="https://www.freepik.com/free-vector/telecommuting-concept-illustration_7321334.htm#query=working&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik
                </div>
            </div> */}
        </>
    )
}