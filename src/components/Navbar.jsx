import { Link } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-black">EcomStore</Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/products" className="text-black">Products</Link>
            <button onClick={logout} className="text-black">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black">Login</Link>
            <Link to="/signup" className="text-black">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
