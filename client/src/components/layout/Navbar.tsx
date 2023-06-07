import { Link } from 'react-router-dom';
import LogoImage from '../../assets/logo.png';
import UserImage from '../../assets/user.png';
import { useAuthContext } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="w-full mx-auto flex justify-between items-center gap-10 px-5 py-2 border-b border-1 shadow-md mb-2">
      <Link to="/" className="flex justify-start items-center gap-3">
        <img src={LogoImage} alt="logo" className="w-8 pb-2" />
        <h1 className="text-xl font-[700]">Voda Blog</h1>
      </Link>
      <div className="flex justify-start items-center gap-5">
        {user && <h1 className="text-sm font-[400] text-gray-700 hidden md:block">{user.name}</h1>}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <img src={UserImage} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 space-y-2 z-10"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/my-posts">My Posts</Link>
              </li>
              <li>
                <Link to="/liked-posts">Liked Posts</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
              Login
            </Link>
            <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
