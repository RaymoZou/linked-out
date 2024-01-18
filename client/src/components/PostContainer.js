import { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';

export default function PostContainer(props) {

	const [posts, setPosts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3001/post");
				setPosts(response.data);
				{/* console.log(data); */ }
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, [])

	return (
		<div className='grid gap-4'>
			{posts ? posts.map(post => <Post key={post._id} name={post.name} postId={post._id} text={post.text} />) : 'loading...'}
			{/* {props.posts ? props.posts.docs.map(doc => <Post postId={doc.id} key={doc.id} post={doc.data()} />) : null} */}
		</div>
	)
}
