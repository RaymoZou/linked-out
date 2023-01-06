import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/Group';
import SuitcaseIcon from '@mui/icons-material/BusinessCenter';
import ChatBubbleIcon from '@mui/icons-material/Textsms';
import BellIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AppsIcon from '@mui/icons-material/Apps';
import DropDownIcon from '@mui/icons-material/ArrowDropDown';

import styles from '../styles/Navbar.module.css';
import { useEffect, useState, useRef } from 'react';

export default function Navbar(props) {

  const [isDropDown, setDropDown] = useState(false);
  const btnRef = useRef();

  useEffect(() => {

    function closeDropDown(e) {
      if (e.path[0] !== btnRef.current) setDropDown(false);
    }

    document.body.addEventListener('click', closeDropDown);

    return () => document.body.removeEventListener('click', closeDropDown);
  })

  // const renderDropDown = () => setDropDown(true);
  function renderDropDown(e) {
    e.stopPropagation();
    setDropDown(true);
  }

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
        <button ref={btnRef} onClick={renderDropDown} className={styles.navProfile}>
          <img alt='profile_pic' src={props.photoURL} />
          <div className={styles.navButtonText}>
            <div>Me</div>
            <DropDownIcon />
            {isDropDown ? <DropDownMenu signOut={props.signOut} /> : null}
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
          <div onClick={props.signOut}>Sign Out</div>
        </ul>
      </div>
    </div>
  )
}