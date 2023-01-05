import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoIcon from '@mui/icons-material/SmartDisplay';
import CalendarIcon from '@mui/icons-material/Today';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import styles from './App.module.css';

export default function MainFeed(props) {
    return (
        <div className={styles['scaffold-main']}>
            <div className={styles['main-input']}>
                <div className={styles['top-container']}>
                    <img src={props.photoURL} alt="profile_pic" />
                    <button className={styles['post-button']}>Start a post</button>
                </div>
                <div className={styles['icon-bar']}>
                    <div className={[styles["post-icon"], styles["photo-icon"]].join(' ')}>
                        <PhotoIcon />
                        <span className={styles["icon-text"]}>Photo</span>
                    </div>
                    <div className={[styles["post-icon"], styles["video-icon"]].join(' ')}>
                        <VideoIcon />
                        <span className={styles["icon-text"]}>Video</span>
                    </div>
                    <div className={[styles["post-icon"], styles["event-icon"]].join(' ')}>
                        <CalendarIcon />
                        <span className={styles["icon-text"]}>Event</span>
                    </div>
                    <div className={[styles["post-icon"], styles["newspaper-icon"]].join(' ')}>
                        <NewspaperIcon />
                        <span className={styles["icon-text"]}>Write Article</span>
                    </div>
                </div>
            </div>
        </div>
    )
}