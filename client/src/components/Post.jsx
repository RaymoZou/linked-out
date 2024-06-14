import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from "../App";
import { fromUnixTime, format } from 'date-fns'
import { formatDistance } from 'date-fns/formatDistance';

export default function Post(props) {
    const { name, text, postId } = props;
    const { user, setPosts } = useContext(UserContext);

    // parses the date from objectId string into the following format: dd/mm/yyyy hh:mm:ss
    function getDate(postId) {
        const unix_time = parseInt(postId.substring(0, 8), 16);
        const date = fromUnixTime(unix_time);
        return format(date, 'dd/MM/yyyy hh:mm:ss a') + ` (${formatDistance(date, new Date(), { addSuffix: true })})`;
    };

    async function fetchData() {
        try {
            const response = await axios.get("/post");
            setPosts(response.data);
        } catch (err) {
            console.error(err);
        };
    };

    async function deletePost() {
        try {
            const data = { post_id: postId, author: name };
            const res = await axios.delete("/post", { data, withCredentials: true });
            if (res.status === 200) {
                fetchData();
            };
        } catch (error) {
            console.error(error.response.status);
        };
    };

    // TODO: implement
    async function editPost() {
        try {
            console.log(`editing post with id: ${postId}`);
        } catch (error) {
            console.error(error.response.status);
        };
    };

    return (
        <div className="flex flex-col items-start bg-indigo-200 gap-2 p-4 rounded">
            <div className="font-bold text-lg">{name}</div>
            <div className="break-all">{text}</div>
            <div className="break-all text-gray-800 italic">{getDate(postId)}</div>
            <div className="flex self-end gap-4">
                {name === user.username ? <button onClick={editPost} className="transition bg-emerald-500 hover:bg-emerald-600 rounded p-2 text-lg font-bold text-white self-end" >Edit</button> : null}
                {name === user.username ? <button onClick={deletePost} className="transition bg-red-500 hover:bg-red-600 rounded p-2 text-lg font-bold text-white self-end" >Delete</button> : null}
            </div>
        </div>
    );
}
