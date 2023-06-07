import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function NotFound() {
  const { user } = useAuthContext();

  // Redirect to login page if user is not logged in
  if (!user) return <Navigate to="/login" replace />;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full max-w-[1280px] mx-auto flex flex-col justify-center items-center gap-3 p-5 md:p-10"
      role="region"
      aria-label="Main Content"
    >
      <h1 className="text-3xl font-[700] text-gray-600">404</h1>
      <h2 className="text-2xl font-[700] text-gray-800">Page Not Found</h2>
      <p className="font-[400] text-gray-600 mt-2">The page you are looking for does not exist</p>
      <Link to="/" className="text-blue-500 hover:underline mt-5">
        Go Back Home
      </Link>
    </motion.section>
  );
}

export default NotFound;
