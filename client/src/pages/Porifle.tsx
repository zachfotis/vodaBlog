import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useAuthContext();

  // Redirect to login page if user is not logged in
  if (!user) return <Navigate to="/login" replace />;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full max-w-[1280px] mx-auto flex flex-col justify-start items-start gap-10 p-5 md:p-10"
      role="region"
      aria-label="Main Content"
    >
      <h1 className="text-3xl font-[700] text-gray-600">User Profile</h1>
    </motion.section>
  );
}

export default Profile;
