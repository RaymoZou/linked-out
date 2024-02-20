import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar(props) {

    const user = useContext(UserContext);

    return (
        <div className="flex justify-end items-center gap-4 bg-slate-400 p-5">
            <div className="font-bold text-lg text-white"> Welcome back, {user.username}! </div>
            <button className="bg-blue-500 rounded p-2 text-lg font-bold text-white hover:bg-blue-600" onClick={props.signOut}>Logout</button>
        </div>
    );
};
