import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from "../App";


export default function PostCreationBar() {

    const [postText, setPostText] = useState("");
    const { setPosts } = useContext(UserContext);

    function onChange(e) {
        setPostText(e.target.value);
    };

    // TODO: maybe just update posts on client side?
    // TODO: fetchData is copy and pasted
    async function fetchData() {
        try {
            const response = await axios.get("/post");
            setPosts(response.data);
        } catch (err) {
            console.error(err);
        };
    };

    // make api request here
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = { text: postText };
            const res = await axios.post("/post", data, { withCredentials: true });
            if (res.status === 200) {
                setPostText("");
                fetchData();
            };
        } catch (err) {
            console.error(err)
        };
    };

    return (
        <div className='flex shadow-lg gap-4 bg-indigo-200 p-4 justify-center rounded' onSubmit={handleSubmit}>
            <form name="form" className='flex gap-4'>
                <input onChange={onChange}
                    value={postText}
                    type="text" name="post"
                    placeholder="What's on your mind?"
                    className="p-4 shadow-lg rounded shadow-none outline-none"
                    required
                />
                {/* TODO: replace this with custom Button.jsx class for modularity */}
                <button className="transition bg-violet-500 hover:bg-violet-600 text-lg text-white font-bold p-2 rounded">Post</button>
            </form>
        </div>
    )
}
