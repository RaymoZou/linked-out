import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/Group';
import SuitcaseIcon from '@mui/icons-material/BusinessCenter';
import ChatBubbleIcon from '@mui/icons-material/Textsms';
import BellIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';
import DropDownIcon from '@mui/icons-material/ArrowDropDown';

import styles from '../styles/Navbar.module.css';

export default function Navbar(props) {

  return (
    <div className={styles.navBar}>
      <div className={styles.searchBarContainer}>
        <div className={styles.logo}>out</div>
        <input className={styles.searchBar} placeholder='Search'></input>
      </div>
      <div className={styles.navButtonContainer}>
        <div className={styles.navButton}><HomeIcon />Home</div>
        <div className={styles.navButton}><PeopleIcon />My Network</div>
        <div className={styles.navButton}><SuitcaseIcon />Jobs</div>
        <div className={styles.navButton}><ChatBubbleIcon />Messaging</div>
        <div className={styles.navButton}><BellIcon />Notifications</div>
        <button className={styles.navProfile}>
          <img alt='profile_pic' src={props.photoURL} />
          <div className={styles.navButtonText}>
            <div>Me</div>
            <DropDownIcon />
            <DropDownMenu signOut={props.signOut}/>
          </div>
        </button>
        <div className={styles.navButton}><AppsIcon />Work</div>
        <div className={styles.navButton}><AutoStoriesIcon />Learning</div>
      </div>
    </div>
  )
}

function DropDownMenu(props) {
  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownMenu}>
        <ul>
          <div>Welcome back!</div>
          <button onClick={props.signOut}>Sign Out</button>
        </ul>
      </div>
    </div>
  )
}