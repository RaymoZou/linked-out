import { useState } from 'react';
import axios from 'axios';

export default function PostCreationBar() {

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
        <div className='flex gap-4 bg-darkgreen p-4 justify-center rounded' onSubmit={handleSubmit}>
            <form name="form" className='flex gap-4'>
                <input onChange={onChange}
                    value={postText}
                    type="text" name="post"
                    placeholder="What's your mind?"
                    className="p-4 rounded shadow-none outline-none"
                />
                <button className="bg-green-700 rounded p-2 text-lg font-bold text-white hover:bg-green-800" >Post</button>
            </form>
        </div>
    )
}
