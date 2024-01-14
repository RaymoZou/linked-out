import Post from './Post';

export default function PostContainer(props) {
	// TODO: merge PostContainer and Post? Don't think both are needed
	return (
		<div className='grid gap-4'>
			{props.posts ? props.posts.docs.map(doc => <Post postId={doc.id} key={doc.id} post={doc.data()} />) : null}
		</div>
	)
}
