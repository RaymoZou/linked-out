import { useContext, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

export default function MainFeed() {

	const { photoURL } = useContext(UserContext);
	const [postText, setPostText] = useState("");

	// TODO: replace this with user's name
	const name = "guest";

	function onChange(e) {
		setPostText(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		try {
			const data = { text: postText, name: name };
			axios.post("http://localhost:3001/post", data);
			setPostText('');
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='flex m-4 gap-4 items-end' onSubmit={handleSubmit}>
			<img src={photoURL} alt="profile_pic" />
			<form name="form" className='flex gap-4'>
				<input onChange={onChange} value={postText} type="text" name="post" placeholder="What's your mind?" className="border-b border-gray-500 focus:outline-none focus:border-blue-500" />
				<button className="bg-purple-500 rounded p-2 text-lg font-bold text-white hover:bg-purple-600" >Post</button>
			</form>
		</div>
	)
}
