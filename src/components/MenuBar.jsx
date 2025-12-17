
export default function MenuBar () {
    return (
        <nav className="flex p-4 w-full bg-black justify-between items-center">
            <a href="/" className="text-white font-bold">Logo</a>
            <ul className="flex space-x-4">
                <li><a href="/login" className="text-white font-bold">login</a></li>
                <li><a href="/users" className="text-white font-bold">Users</a></li>
                <li><a href="/help" className="text-white font-bold">Notifications</a></li>
                <li><a href="/help" className="text-white font-bold">help</a></li>
                <li><a href="/help" className="text-white font-bold">Menu</a></li>
                <li><a href="/help" className="text-white font-bold">Profile</a></li>
            </ul>
        </nav>
    )
}