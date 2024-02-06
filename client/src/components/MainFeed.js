import { useState } from 'react';
import axios from 'axios';

export default function MainFeed() {

    const [postText, setPostText] = useState("");

    function onChange(e) {
        setPostText(e.target.value);
    }

    // make api request here
    function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = { text: postText };
            axios.post("/post", data, { withCredentials: true });
            setPostText('');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='flex m-4 gap-4 items-end bg-blue-200 p-4 justify-center' onSubmit={handleSubmit}>
            {/* <img src={photoURL} alt="profile_pic" className="rounded" /> */}
            <form name="form" className='flex gap-4'>
                <input onChange={onChange}
                    value={postText}
                    type="text" name="post"
                    placeholder="What's your mind?"
                    className="border-b border-gray-500 focus:outline-none focus:border-blue-500 p-4 rounded"
                />
                <button className="bg-purple-500 rounded p-2 text-lg font-bold text-white hover:bg-purple-600" >Post</button>
            </form>
        </div>
    )
}
