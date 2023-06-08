import { AnimatePresence } from 'framer-motion';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import AuthContextProvider from './context/AuthContext';
import BlogContextProvider from './context/BlogContext';
import Home from './pages/Home';
import LikedPosts from './pages/LikedPosts';
import NotFound from './pages/NotFound';
import Profile from './pages/Porifle';

function App() {
  return (
    <AuthContextProvider>
      <BlogContextProvider>
        <Router>
          <Navbar />
          <AnimatedRoutes />
        </Router>
        <ToastContainer autoClose={2000} closeOnClick />
      </BlogContextProvider>
    </AuthContextProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // This code makes it so that the page transitions are animated using the
    // Framer Motion library. The animation is only played when the page changes,
    // and the animation is played in parallel with the page transition.

    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login isLogin={false} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
