import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/Group';
import SuitcaseIcon from '@mui/icons-material/BusinessCenter';
import ChatBubbleIcon from '@mui/icons-material/Textsms';
import BellIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';

import styles from './App.module.css';

export default function Navbar(props) {
    return (
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
          <div className={styles['nav-button']}><img alt='profile_pic' src={props.photoURL} />Me</div>
          <div className={styles['nav-button']}><AppsIcon />Work</div>
          <div className={styles['nav-button']}><AutoStoriesIcon />Learning</div>
        </div>
      </div>
    )
}