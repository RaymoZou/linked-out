 import { Menu, MenuItem } from "@mui/material";

import styles from "../styles/Navbar.module.css";
import { UserContext } from "../App";
import { useState, useContext } from "react";

export default function Navbar(props) {
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(e) {
    if (anchorEl) return;
    setAnchorEl(e.currentTarget);
  }

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.wrapper}>
        <div className={styles.searchBarContainer}>
          <div className={styles.logo}>out</div>
          <input className={styles.searchBar} placeholder="Search"></input>
        </div>
        <div className={styles.navButtonContainer}>
          <button onClick={handleClick} className={styles.navProfile}>
            <img alt="profile_pic" src={user.photoURL} />
            <div className={styles.navButtonText}></div>
          </button>
        </div>
      </div>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disableAutoFocus={true}
        onClose={handleClickAway}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={props.signOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}
