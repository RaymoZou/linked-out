import styles from '../styles/Post.module.css';

export default function Post(props) {

    const { name, postText, photoURL, postImgURL } = props.post;

    return <div className={`${styles.outline} ${styles.postContainer}`}>
        <div className={styles.posterInfoContainer}>
            <img className={styles.profileImg} src={photoURL} alt="" />
            <div className={styles.postNameContainer}>
                {name}
            </div>
        </div>
        <div className={styles.postTextContainer}>
            {postText}
        </div>
        {postImgURL ? <img className={styles.postImg} src={postImgURL} alt='post_image' /> : null}
    </div>;
}