import { useState } from 'react';
import axios from 'axios';
// import Button from './Button';

export default function PostCreationBar() {

    const [postText, setPostText] = useState("");

    function onChange(e) {
        setPostText(e.target.value);
    };

    // make api request here
    // TODO: refresh post feed after submit (optimistic UI)
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = { text: postText };
            const res = await axios.post("/post", data, { withCredentials: true });
            if (res.status === 200) {
                console.log("successfully posted");
            };
        } catch (err) {
            console.error(err)
        };
    };

    return (
        <div className='flex gap-4 bg-indigo-200 p-4 justify-center rounded' onSubmit={handleSubmit}>
            <form name="form" className='flex gap-4'>
                <input onChange={onChange}
                    value={postText}
                    type="text" name="post"
                    placeholder="What's on your mind?"
                    className="p-4 rounded shadow-none outline-none"
                    required
                />
                <button className="transition bg-violet-500 hover:bg-violet-600 text-lg text-white font-bold p-2 rounded">Post</button>
            </form>
        </div>
    )
}
