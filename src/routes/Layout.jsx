import { useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

    useEffect(() => {
        if (!user) {
        navigate("/login");
        }
    }, [user, navigate]);


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