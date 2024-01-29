import { UserContext } from "../App";
import { useState, useContext } from "react";

export default function Navbar(props) {
	// const user = useContext(UserContext);
	// const [anchorEl, setAnchorEl] = useState(null);

	// function handleClick(e) {
	// 	if (anchorEl) return;
	// 	setAnchorEl(e.currentTarget);
	// }

	// const handleClickAway = () => {
	// 	setAnchorEl(null);
	// };

	return (
		<div className="flex justify-end bg-slate-400 p-5">
			<button className="bg-blue-500 rounded p-2 text-lg font-bold text-white hover:bg-blue-600" onClick={props.signOut}>Logout</button>
		</div>);
};
