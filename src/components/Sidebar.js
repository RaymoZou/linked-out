import { useContext } from 'react';
import { UserContext } from '../App';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {

    const { displayName, photoURL } = useContext(UserContext)

    return (
        <div className={`${styles.scaffoldSidebar} ${styles.outline}`}>
            {/* <div className={styles.wrapper}>
                <div className={styles.sidebarBackgroundImg}>
                    <img src={
                        photoURL ||
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    } alt='profile_pic' />
                </div>
            </div> */}
            <div className={styles.profilePictureContainer}>
                <img className={styles.profilePicture} src={photoURL} alt="" />
            </div>
            <div className={styles.sidebarText}>
                <div className={styles.sidebarHeader}>
                    <div>{displayName}</div>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.sidebarButton}>
                        <div>Connections</div>
                        {/* <div>42</div> */}
                    </div>
                    <div className={styles.sidebarButton}>
                        <div>Who's viewed your profile</div>
                        {/* <div className={styles.profileViewCount}>502</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}