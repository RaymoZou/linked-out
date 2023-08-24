import styles from '../styles/MainFeed.module.css';

import { useContext } from 'react';
import { UserContext } from '../App';

export default function MainFeed({ setOverlay, docs }) {

    const { photoURL } = useContext(UserContext);

    function postModeOn(e) {
        setOverlay(true);
        e.stopPropagation();
    }

    return (
        <>
            <div className={styles.mainInput}>
                <div className={styles.topContainer}>
                    <img src={photoURL} alt="profile_pic" />
                    <button onClick={postModeOn} className={styles.postButton}>Start a post</button>
                </div>
            </div>
            <hr />
        </>

    )
}
