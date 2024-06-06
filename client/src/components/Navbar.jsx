import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar(props) {

    const { user } = useContext(UserContext);

    return (
        <div className="flex justify-center md:justify-end items-center gap-4 bg-slate-500 p-5">
            <div className="font-bold text-lg text-white"> Welcome back, <span className="underline decoration-4 underline-offset-8">{user.username}</span>! </div>
            <button onClick={props.signOut} className="transition bg-blue-500 hover:bg-blue-600 text-lg text-white font-bold p-2 rounded">Logout</button>
        </div>
    );
};
