import Layout from '../routes/Layout';

export default function MenuBar () {
    return (
        <Layout>
            <nav className="flex p-4 w-full bg-black justify-between items-center sticky top-0">
                <a href="/" className="text-white font-bold">Logo</a>
                <ul className="flex space-x-4">
                    <li><a href="/help" className="text-white font-bold">Notifications</a></li>
                    <li><a href="/help" className="text-white font-bold">help</a></li>
                    <li><a href="/help" className="text-white font-bold">Menu</a></li>
                    <li><a href="/help" className="text-white font-bold">Profile</a></li>
                </ul>
            </nav>
        </Layout>
    )
}