export default function Navbar(props) {
	return (
		<div className="flex justify-end bg-slate-400 p-5">
			<button className="bg-blue-500 rounded p-2 text-lg font-bold text-white hover:bg-blue-600" onClick={props.signOut}>Logout</button>
		</div>);
};
