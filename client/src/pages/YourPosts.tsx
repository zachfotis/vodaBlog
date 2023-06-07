import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import PostThumb from '../components/common/PostThumb';
import ScrollToTop from '../components/common/ScrollToTop';
import { useAuthContext } from '../context/AuthContext';
import { useBlogContext } from '../context/BlogContext';
import { Post } from '../types';

function YourPosts() {
  const { user } = useAuthContext();
  const { posts } = useBlogContext();

  const yourPosts = user && posts.filter((post: Post) => post.user.id === user.id);

  // Redirect to login page if user is not logged in
  if (!user) return <Navigate to="/login" replace />;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1280px] mx-auto flex flex-col justify-start items-start gap-10 p-5 md:p-10"
      role="region"
      aria-label="Main Content"
    >
      <div
        className="w-full flex flex-col justify-start items-start gap-10 mt-5"
        role="navigation"
        aria-label="New Post Navigation"
      >
        <h1 className="text-3xl font-[700] text-gray-600">Your Posts</h1>
      </div>
      <div
        className="w-full flex flex-col justify-start items-start gap-10 p-3"
        role="list"
        aria-label="Post Thumbnails"
      >
        {yourPosts && yourPosts.length > 0 ? (
          yourPosts.map((post: Post) => <PostThumb key={post.id} post={post} />)
        ) : (
          <p className="font-[400] text-gray-600">No posts yet</p>
        )}
      </div>
      <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
        <ScrollToTop />
      </div>
    </motion.section>
  );
}

export default YourPosts;
