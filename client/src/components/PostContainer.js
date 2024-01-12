import Post from './Post';

export default function PostContainer(props) {

    return (
        <div >
            {props.posts ? props.posts.docs.map(doc => <Post postId={doc.id} key={doc.id} post={doc.data()} />) : null}
        </div>
    )
}
