import styles from './App.module.css';

export default function Sidebar(props) {
    return (
        <div className={[styles.outline, styles['scaffold-sidebar']].join(' ')}>
            <div className={styles['wrapper']}>
                <div className={styles['sidebar-background-img']}>
                    <img src={
                        props.photoURL ||
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    } alt='profile_pic' />
                </div>
            </div>
            <div className={styles['sidebar-text']}>
                <div className={styles['sidebar-header']}>{props.displayName}</div>
                <div className={styles['button-container']}>
                    <div className={styles['sidebar-button']}>
                        <div>Connections</div>
                        <div>42</div>
                    </div>
                    <div className={styles['sidebar-button']}>
                        <div>Who's viewed your profile</div>
                        <div className={styles['profile-view-count']}>502</div>
                    </div>
                </div>
            </div>
        </div>
    )
}