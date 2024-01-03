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
            </div>           
        </>
    )
}
