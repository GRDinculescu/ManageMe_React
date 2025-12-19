import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MenuBar() {
  const { user, role, logout } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  return (
    <nav className="flex p-4 w-full bg-black justify-between items-center">
      <Link to="/" className="text-white font-bold">
        Logo
      </Link>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/home" className="text-white font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" className="text-white font-bold">
            Users
          </Link>
        </li>
        <li>
          <Link to="/help" className="text-white font-bold">
            Help
          </Link>
        </li>
        {user ? (
          <>
            <li className="text-white text-sm">
              {user.name}
            </li>
            <li>
              <span className="text-xs font-semibold text-black bg-white px-3 py-1 rounded-full">
                Rol: {role}
              </span>
            </li>
            <li>
              <button
                type="button"
                className="text-white font-bold underline underline-offset-4"
                onClick={handleLogout}
              >
                Salir
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="text-white font-bold">
              Entrar
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
