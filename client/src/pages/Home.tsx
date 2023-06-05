import { Navigate } from 'react-router-dom';
import Posts from '../components/home/Posts';
import { useAuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useAuthContext();

  // Redirect to login page if user is not logged in
  return user ? <Posts /> : <Navigate to="/login" replace />;
}

export default Home;
