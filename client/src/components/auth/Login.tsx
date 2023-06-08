import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdAlternateEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BannerImage from '../../assets/banner.jpg';
import { useAuthContext } from '../../context/AuthContext';

interface LoginProps {
  isLogin?: boolean;
}

function Login({ isLogin = true }: LoginProps) {
  const { user, login, register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const activeClass = 'bg-primary text-white';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) return toast.error('Please fill in all fields');
      if (password.length < 8) return toast.error('Password must be at least 8 characters');

      // Login user
      login({ email, password });
    } else {
      if (!name || !email || !password || !verifyPassword) return toast.error('Please fill in all fields');
      if (password.length < 8) return toast.error('Password must be at least 8 characters');
      if (password !== verifyPassword) return toast.error('Passwords do not match');

      // Register user
      register({ name, email, password });
    }
  };

  // Redirect to home page if user is logged in
  if (user) return <Navigate to="/" replace />;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative w-full mx-auto -mt-2 flex-1 flex flex-col justify-center items-center gap-10"
      role="region"
      aria-label="Main Content"
    >
      <img
        src={BannerImage}
        alt="Banner"
        className="absolute top-0 left-0 w-full h-full object-cover object-center -z-20 
        filter opacity-10 brightness-75 saturate-125"
      />
      <form
        className="w-[90%] max-w-[500px] bg-white border border-1 rounded-md shadow-lg p-7 flex flex-col justify-center items-center gap-10 mb-20"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-center items-center">
          <Link
            to="/login"
            className={`${isLogin && activeClass} w-full text-center text-lg font-[500] border border-1 px-5 py-2`}
          >
            <h1>Login</h1>
          </Link>
          <Link
            to="/register"
            className={`${!isLogin && activeClass} w-full text-center text-lg font-[500] border border-1 px-5 py-2`}
          >
            <h1>Register</h1>
          </Link>
        </div>
        <h1 className="text-2xl font-[700] text-gray-600">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
        <div className="w-full flex flex-col justify-start items-center gap-5">
          {/* USER NAME */}
          {!isLogin && (
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}
          {/* USER EMAIL */}
          <div className="w-full relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <MdAlternateEmail className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {/* USER PASSWORD */}
          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={8}
              maxLength={20}
              required
            />
            {showPassword ? (
              <MdVisibilityOff
                className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <MdVisibility
                className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {/* USER VERIFY PASSWORD */}
          {!isLogin && (
            <div className="w-full relative">
              <input
                type={showVerifyPassword ? 'text' : 'password'}
                placeholder="Verify your password"
                className="w-full input input-bordered"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                autoComplete="current-password"
                minLength={8}
                maxLength={20}
                required
              />
              {showVerifyPassword ? (
                <MdVisibilityOff
                  className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                />
              ) : (
                <MdVisibility
                  className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                />
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full btn btn-outline btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:btn-neutral"
          disabled={isLogin ? !email || !password : !name || !email || !password || !verifyPassword}
        >
          {isLogin ? 'Sign in' : 'Register'}
        </button>
        {isLogin ? (
          <p className="text-gray-600 text-sm">
            No account?{' '}
            <Link to="/register" className="text-primary font-[500]">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-[500]">
              Sign in
            </Link>
          </p>
        )}
      </form>
    </motion.section>
  );
}

export default Login;
