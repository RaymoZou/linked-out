import { useContext, useState } from 'react';
import { UserContext } from '../App';

export default function MainFeed() {

	const { photoURL } = useContext(UserContext);

	function handleSubmit(e) {
		e.preventDefault();
		// TODO: send an API post request 
		
		// log form value
		const formData = document.forms['form'].elements['post'].value;
		console.log(formData)
	}

	return (
		<div className='flex m-4 gap-4 items-end' onSubmit={handleSubmit}>
			<img src={photoURL} alt="profile_pic" />
			<form name="form" className='flex gap-4'>
				<input type="text" name="post" placeholder="What's your mind?" className="border-b border-gray-500 focus:outline-none focus:border-blue-500" />
				<button className="bg-purple-500 rounded p-2 text-lg font-bold text-white hover:bg-purple-600" >Post</button>
			</form>
		</div>
	)
}
