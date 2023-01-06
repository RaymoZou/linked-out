import styles from '../styles/App.module.css';

export default function Overlay(props) {

    const { setOverlay, isOpen, displayName, photoURL } = props;

    const handleOutsideClick = () => setOverlay(false);

    return isOpen ? (<div
        onClick={handleOutsideClick}
        className={styles.overlay}>
        <PostInput displayName={displayName} photoURL={photoURL} />
    </div>)
        : null
}

function PostInput(props) {

    const { photoURL, displayName } = props;

    const handleInsideClick = e => e.stopPropagation();
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
            <textarea name="" id="" cols="30" rows="10" placeholder="What do you want to talk about?"></textarea>
            <button>Post</button>
        </form>
    </div>
}