import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from "../App";

export default function Post(props) {
    const { name, text, postId } = props;
    const userContext = useContext(UserContext);

    async function deletePost() {
        try {
            const data = { post_id: postId, author: name };
            const res = await axios.delete("/post", { data, withCredentials: true });
            console.log(res.status);
        } catch (error) {
            console.log(error.response.status);
        }
    }

    // TODO: responsiveness at multiple screen resolutions
    return (
        <div className="flex flex-col items-start bg-lightgreen gap-2 p-4 rounded">
            <div className="bg-yellow">{name}</div>
            <div className="break-all">{text}</div>
            {name === userContext.username ? <button onClick={deletePost} className="bg-red-500 hover:bg-red-600 rounded p-2 text-lg font-bold text-white self-end" >Delete</button> : null}
        </div>
    );
}
