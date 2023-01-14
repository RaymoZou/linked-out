import styles from '../styles/Post.module.css';
import ThreeDots from '@mui/icons-material/MoreHoriz';
import DropDownMenu from './DropDownMenu';
import { useEffect, useState, useRef, useContext } from 'react';
import { db, UserContext, storage } from '../App.js';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export default function Post(props) {

    const currentUser = useContext(UserContext);
    const [isDropDown, setDropDown] = useState(false);
    const btnRef = useRef();
    const { name, postText, photoURL, postImgURL, uid, imgName } = props.post;
    const { postId } = props;

    useEffect(() => {

        function closeDropDown(e) {
            if (e.path[0] !== btnRef.current) setDropDown(false);
        }

        document.body.addEventListener('click', closeDropDown);

        return () => document.body.removeEventListener('click', closeDropDown);
    })

    function renderDropDown(e) {
        e.stopPropagation();
        setDropDown(true);
    }

    function deletePost() {
        const imgRef = ref(storage, `images/${currentUser.uid}/${imgName}`);
        deleteObject(imgRef);
        // TODO: add image delete THEN post delete
        if (currentUser.uid === uid) {
            const docRef = doc(db, "posts", postId);
            deleteDoc(docRef);
        }
    }


    return <div className={`${styles.outline} ${styles.postContainer}`}>
        <div className={styles.postHeader}>
            <div className={styles.posterInfoContainer}>
                <img className={styles.profileImg} src={photoURL} alt="" />
                <div className={styles.postNameContainer}>
                    {name}
                </div>
            </div>
            {currentUser.uid === uid ?
                <div onClick={renderDropDown} className={styles.horizontalButton}>
                    <ThreeDots />
                    <DropDownMenu isOpen={isDropDown}>
                        <ul onClick={deletePost} className={styles.deleteButton}>
                            <li>Delete post</li>
                        </ul>
                    </DropDownMenu>
                </div>
                : null}
        </div>
        <div className={styles.postTextContainer}>
            {postText}
        </div>
        {postImgURL ? <img className={styles.postImg} src={postImgURL} alt='post_image' /> : null}
    </div>;
}