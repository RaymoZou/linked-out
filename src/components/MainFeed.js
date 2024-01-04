import { useContext } from 'react';
import { UserContext } from '../App';

export default function MainFeed({ setOverlay, docs }) {

    const { photoURL } = useContext(UserContext);

    function postModeOn(e) {
        setOverlay(true);
        e.stopPropagation();
    }

    return (
        <>
            <div >
                <div >
                    <img src={photoURL} alt="profile_pic" />
                    <button onClick={postModeOn} >Start a post</button>
                </div>
            </div>
            <hr />
        </>

    )
}
