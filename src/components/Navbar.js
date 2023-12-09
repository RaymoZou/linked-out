// import { Menu, MenuItem } from "@mui/material";

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

  return (<div className="flex justify-end bg-slate-400 p-5">
    <button className="bg-blue-500 rounded p-2 text-lg font-bold text-white hover:bg-blue-600" onClick={props.signOut}>Logout</button>
  </div>);
  //   <div className={styles.wrapper}>
  //       <div className={styles.navBar}>
  //       <div className={styles.searchBarContainer}>
  //         <div className={styles.logo}>out</div>
  //         <input className={styles.searchBar} placeholder="Search"></input>
  //       </div>
  //       <div className={styles.navButtonContainer}>
  //         <button onClick={handleClick} className={styles.navProfile}>
  //           <img alt="profile_pic" src={user.photoURL} />
  //           <div className={styles.navButtonText}></div>
  //         </button>
  //       </div>
  //     </div>
  //     <Menu
  //       open={Boolean(anchorEl)}
  //       anchorEl={anchorEl}
  //       disableAutoFocus={true}
  //       onClose={handleClickAway}
  //       anchorOrigin={{
  //         vertical: 'bottom',
  //         horizontal: 'right',
  //       }}
  //       transformOrigin={{
  //         vertical: 'top',
  //         horizontal: 'right',
  //       }}
  //     >
  //       <MenuItem onClick={props.signOut}>Sign Out</MenuItem>
  //     </Menu>
  //   </div>
  // );
};
