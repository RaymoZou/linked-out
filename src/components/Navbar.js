import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/Group';
import SuitcaseIcon from '@mui/icons-material/BusinessCenter';
import ChatBubbleIcon from '@mui/icons-material/Textsms';
import BellIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';
import { Menu, MenuItem } from '@mui/material';

import styles from '../styles/Navbar.module.css';
import { UserContext } from '../App';
import { useState, useContext } from 'react';

export default function Navbar(props) {

  const [anchor, setAnchor] = useState(null);
  const user = useContext(UserContext);

  const openPopupMenu = (e) => { setAnchor(e.currentTarget) };

  return (
    <div className={styles.navBar}>
      <div className={styles.wrapper}>
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
          <button onClick={openPopupMenu} className={styles.navProfile}>
            <img alt='profile_pic' src={user.photoURL} />
            <div className={styles.navButtonText}>
              <Menu open={Boolean(anchor)} anchorEl={anchor}>
                <MenuItem>Hello</MenuItem>
              </Menu>
            </div>
          </button>
          <div className={styles.navButton}><AppsIcon />Work</div>
          <div className={styles.navButton}><AutoStoriesIcon />Learning</div>
        </div>
      </div>
    </div>
  )
}