import { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';

export default function PostContainer() {

	const [posts, setPosts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/post");
				setPosts(response.data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, [])

	return (
		<div className='flex flex-col gap-4'>
			{posts ? posts.map(post => <Post key={post._id} name={post.name} postId={post._id} text={post.text} />) : 'loading...'}
		</div>
	)
}
