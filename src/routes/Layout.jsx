import MenuBar from '../components/MenuBar';

export default function Layout({ children }) {
    return (
        <div>
            <div className='fixed top-0 left-0 w-full z-50'>
                <MenuBar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}