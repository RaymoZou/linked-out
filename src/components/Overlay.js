import { useState } from 'react';
import styles from '../styles/App.module.css';

export default function Overlay(props) {

    const { setOverlay, isOpen, displayName, photoURL, uploadPost } = props;

    const handleOutsideClick = () => setOverlay(false);

    return isOpen ? (<div
        onClick={handleOutsideClick}
        className={styles.overlay}>
        <PostInput
            displayName={displayName}
            photoURL={photoURL}
            setOverlay={setOverlay}
            uploadPost={uploadPost} />
    </div>)
        : null
}

function PostInput(props) {

    const { photoURL, displayName, setOverlay, uploadPost } = props;
    const [postText, setPostText] = useState();

    const handleInsideClick = e => e.stopPropagation();
    const updatePostText = e => setPostText(e.target.value);

    async function postToFirebase(e) {
        const postObject = {
            name: {displayName},
            photoURL: {photoURL},
            postText: {postText}
        }
        uploadPost(postObject);
        setPostText('');
        setOverlay(false);
        e.preventDefault();
    }

    return <div onClick={handleInsideClick}
        className={`${styles.createPost} ${styles.outline}`}>
        <div className={styles.header}>
            <div>Create a post</div>
            <button>X</button>
        </div>
        <div className={styles.profilePicContainer}>
            <img src={photoURL} alt="" />
            <div>{displayName}</div>
        </div>
        <form action="">
            <textarea
                name=""
                id="" cols="30"
                rows="10"
                placeholder="What do you want to talk about?"
                onChange={updatePostText}
                value={postText}>
            </textarea>
            <button onClick={postToFirebase}>Post</button>
        </form>
    </div>
}