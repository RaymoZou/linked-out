import styles from '../styles/Post.module.css';

export default function Post(props) {

    const { name, postText, photoURL} = props.post;

    return <div className={`${styles.outline} ${styles.postContainer}`}>
        <div className={styles.posterInfoContainer}>
            <img src={photoURL} alt="" />
            <div className={styles.postNameContainer}>
                {name}
            </div>
        </div>
        <div className={styles.postTextContainer}>
            {postText}
        </div>
    </div>;
}