import axios from 'axios';

export default function Post(props) {
    const { name, text, postId } = props;

    async function deletePost() {
        try {
            const data = { post_id: postId, author: name };
            const res = await axios.delete("/post", { data, withCredentials: true });
            console.log(res.status);
        } catch (error) {
            // TODO: render an user not authorized error message
            // low priority since delete button can just be conditionally rendered
            console.log(error.response.status);
        }
    }

    // TODO: conditional rendering of delete button
    // TODO: responsiveness at multiple screen resolutions
    // TODO: prevent stretching of other flex items
    return (
        <div className="flex flex-col items-start bg-lightgreen gap-2 p-4 rounded">
            <div className="bg-yellow">{name}</div>
            <div className="break-all">{text}</div>
            <button onClick={deletePost} className="bg-red-500 hover:bg-red-600 rounded p-2 text-lg font-bold text-white self-end" >Delete</button>
        </div>
    );
}
