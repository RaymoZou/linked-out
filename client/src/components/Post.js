import ThreeDots from "@mui/icons-material/MoreHoriz";
import { useState, useContext } from "react";
import { db, UserContext, storage } from "../App.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Menu, MenuItem } from "@mui/material";

export default function Post(props) {
	const currentUser = useContext(UserContext);
	const { name, postText, photoURL, postImgURL, uid, imgName } = props.post;
	const { postId } = props;

	function deletePost() {
		// TODO: send API request to delete post
		console.log(`deleting post: ${postId}`);
		// if (imgName) {
		// 	const imgRef = ref(storage, `images/${currentUser.uid}/${imgName}`);
		// 	deleteObject(imgRef);
		// }
		// if (currentUser.uid === uid) {
		// 	const docRef = doc(db, "posts", postId);
		// 	deleteDoc(docRef);
		// }
	}

	return (
		<div className="bg-blue-300 border-black border p-4 mx-4 flex gap-4">
			<img src={photoURL} alt="" />
			<div className="bg-yellow-200">{name}</div>
			<div className="bg-green-500">{postText}</div>
			{currentUser.uid === uid ? <button className="bg-red-500 rounded p-2 text-lg font-bold text-white hover:bg-red-600" onClick={deletePost}>Delete</button> : null}
			{postImgURL ? <img src={postImgURL} alt="post_image" /> : null}
		</div>
	);
}
