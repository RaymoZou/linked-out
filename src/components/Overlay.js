import { useState } from 'react';
import styles from '../styles/Overlay.module.css';
import { UserContext } from '../App';
import { useContext } from 'react';

export default function PostInputContainer(props) {

    const { displayName, photoURL } = useContext(UserContext);
    const { setOverlay, isOpen, uploadPost } = props;

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

    const { photoURL, displayName } = useContext(UserContext)
    const { setOverlay, uploadPost } = props;
    const [postText, setPostText] = useState('');

    const handleInsideClick = e => e.stopPropagation();
    const updatePostText = e => setPostText(e.target.value);

    async function postToFirebase(e) {
        uploadPost(displayName, photoURL, postText);
        setPostText('');
        setOverlay(false);
        e.preventDefault();
    }

    return <div onClick={handleInsideClick}
        className={`${styles.createPost} ${styles.outline}`}>
        <form>
            <div className={styles.header}>
                <div>Create a post</div>
                <button className={styles.closeButton} onClick={() => setOverlay(false)}>X</button>
            </div>
            <div className={styles.profilePicContainer}>
                <img src={photoURL} alt="" />
                <div>{displayName}</div>
            </div>
            <div className={styles.formContent}>
                <textarea
                    name=""
                    id="" cols="55"
                    rows="10"
                    placeholder="What do you want to talk about?"
                    onChange={updatePostText}
                    value={postText}>
                </textarea>
                <div className={styles.submitButtonContainer}>
                    <button
                        disabled={postText === ''}
                        className={styles.submitButton}
                        onClick={postToFirebase}>Post
                    </button>
                </div>
            </div>
        </form>
    </div>
}