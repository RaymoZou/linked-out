import Post from './Post';
import styles from '../styles/PostContainer.module.css';

export default function PostContainer(props) {

    return (
        <div className={styles.postContainer}>
            {props.posts ? props.posts.docs.map(doc => <Post key={doc.id} post={doc.data()} />) : null}
        </div>
    )
}