import axios from 'axios';

export default function Post(props) {
    // get post_id passed as prop so it can be deleted via http DELETE request
    const { name, text, postId } = props;

    // TODO: send API request to delete post
    async function deletePost() {
        // send http DELETE request with jwt
        const data = { post_id: postId, author: name };
        const res = axios.delete("/post", { data, withCredentials: true });
        console.log(res.status);
    }

    // TODO: conditional rendering of delete button
    return (
        <div className="bg-blue-300 border p-4 mx-4 flex justify-between gap-4 rounded">
            <div className="flex justify-between gap-4">
                <div className="bg-yellow-200 p-2 text-2xl rounded">{name}</div>
                <div className="bg-green-500 p-2 rounded text-xl">{text}</div>
            </div>
            <button onClick={deletePost} className="bg-red-500 rounded p-2 text-lg font-bold text-white hover:bg-red-600" >Delete</button>
        </div>
    );
}
