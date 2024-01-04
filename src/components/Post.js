import ThreeDots from "@mui/icons-material/MoreHoriz";
import DropDownMenu from "./ui/DropDownMenu";
import { useEffect, useState, useRef, useContext } from "react";
import { db, UserContext, storage } from "../App.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Menu, MenuItem } from "@mui/material";

export default function Post(props) {
  const currentUser = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const btnRef = useRef();
  const { name, postText, photoURL, postImgURL, uid, imgName, createdAt } =
    props.post;
  const { postId } = props;

  function handleClick(e) {
    if (anchorEl) return;
    setAnchorEl(e.currentTarget);
  }

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  function deletePost() {
    if (imgName) {
      const imgRef = ref(storage, `images/${currentUser.uid}/${imgName}`);
      deleteObject(imgRef);
    }
    if (currentUser.uid === uid) {
      const docRef = doc(db, "posts", postId);
      deleteDoc(docRef);
    }
  }

  return (
    <div >
      <div>
        <div >
          <img src={photoURL} alt="" />
          <div >{name}</div>
        </div>
        {currentUser.uid === uid ? (
          <div onClick={handleClick} >
            <ThreeDots />
          </div>
        ) : null}
      </div>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disableAutoFocus={true}
        onClose={handleClickAway}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={deletePost}>Delete post</MenuItem>
      </Menu>
      <div >{postText}</div>
      {postImgURL ? (
        <img src={postImgURL} alt="post_image" />
      ) : null}
    </div>
  );
}
