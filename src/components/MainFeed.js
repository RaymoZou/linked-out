import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoIcon from '@mui/icons-material/SmartDisplay';
import CalendarIcon from '@mui/icons-material/Today';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import styles from '../styles/MainFeed.module.css';

export default function MainFeed(props) {
    return (
        <div className={styles.scaffoldMain}>
            <div className={styles.mainInput}>
                <div className={styles.topContainer}>
                    <img src={props.photoURL} alt="profile_pic" />
                    <button className={styles.postButton}>Start a post</button>
                </div>
                <div className={styles.iconBar}>
                    <div className={`${styles.photoIcon} ${styles.postIcon}`}>
                        <PhotoIcon />
                        <span className={styles.iconText}>Photo</span>
                    </div>
                    <div className={`${styles.videoIcon} ${styles.postIcon}`}>
                        <VideoIcon />
                        <span className={styles.iconText}>Video</span>
                    </div>
                    <div className={`${styles.calendarIcon} ${styles.postIcon}`}>
                        <CalendarIcon />
                        <span className={styles.iconText}>Event</span>
                    </div>
                    <div className={`${styles.newspaperIcon} ${styles.postIcon}`}>
                        <NewspaperIcon />
                        <span className={styles.iconText}>Write Article</span>
                    </div>
                </div>
            </div>
        </div>
    )
}