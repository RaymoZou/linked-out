import { useContext } from 'react';
import { UserContext } from '../App';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {

    const { displayName, photoURL } = useContext(UserContext)

    return (
        <div className={`${styles.scaffold} ${styles.outline}`}>
            <div className={styles.profilePictureContainer}>
                <img className={styles.profilePicture} src={photoURL} alt="" />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>{displayName}</div>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <div>Connections</div>
                    </div>
                    <div className={styles.button}>
                        <div>Who's viewed your profile</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
