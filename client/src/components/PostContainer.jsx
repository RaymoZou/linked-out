import { useEffect, createContext, useContext } from 'react';
import { UserContext } from "../App";
import Post from './Post';
import axios from 'axios';

export const PostsContext = createContext(null);

export default function PostContainer() {

    const { posts, fetchData } = useContext(UserContext);

    // fetch posts on initial mount
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            {posts ? posts.map(post => <Post key={post._id} name={post.name} postId={post._id} text={post.text} />) : 'loading...'}
        </div>
    )
}
