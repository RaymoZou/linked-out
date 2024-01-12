import { useContext } from 'react';
import { UserContext } from '../App';

export default function Sidebar() {

    const { displayName, photoURL } = useContext(UserContext)

    return (
        <div >
            <div >
                <img  src={photoURL} alt="" />
            </div>
            <div >
                <div >
                    <div>{displayName}</div>
                </div>
                <div >
                    <div >
                        <div>Connections</div>
                    </div>
                    <div >
                        <div>Who's viewed your profile</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
