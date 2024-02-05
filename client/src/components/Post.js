export default function Post(props) {
    const { name, text } = props;

    // TODO: send API request to delete post
    // function deletePost() {
    //     console.log(`deleting post: ${postId}`);
    // }

    // TODO: conditional rendering of delete button
    return (
        <div className="bg-blue-300 border p-4 mx-4 flex gap-4 rounded">
            {/* <img src={photoURL} alt="" /> */}
            <div className="bg-yellow-200 p-2 text-2xl rounded">{name}</div>
            <div className="bg-green-500 p-2 rounded text-xl">{text}</div>
        </div>
    );
}
