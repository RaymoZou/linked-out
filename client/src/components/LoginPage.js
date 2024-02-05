import axios from "axios";

export default function LoginPage({ setLoginStatus }) {
    async function login(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const res = await axios.post(`/login`, { username, password }, { withCredentials: true });
        setLoginStatus(res.status === 200);
    }

    return (
        <div className='flex justify-center items-center flex-col bg-blue-100 h-screen gap-5'>
            <form onSubmit={login} className="flex flex-col gap-2">
                <input id="username" type="text" placeholder="username" className="p-2 rounded outline-none" autoComplete="on" />
                <input id="password" type="password" placeholder="password" className="p-2 rounded outline-none" autoComplete="on" />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Login</button>
            </form>
        </div>
    )
}
