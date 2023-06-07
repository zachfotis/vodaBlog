import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import PostThumb from '../components/common/PostThumb';
import ScrollToTop from '../components/common/ScrollToTop';
import { useAuthContext } from '../context/AuthContext';
import { useBlogContext } from '../context/BlogContext';
import { Post } from '../types';

function MyPosts() {
  const { user } = useAuthContext();
  const { isLoading, myPosts, fetchMyPosts } = useBlogContext();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Redirect to login page if user is not logged in
  if (!user) return <Navigate to="/login" replace />;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1280px] mx-auto flex flex-col justify-start items-start gap-10 p-5 md:p-10 overflow-hidden"
      role="region"
      aria-label="Main Content"
    >
      <div
        className="w-full flex flex-col justify-start items-start gap-10 mt-5"
        role="navigation"
        aria-label="New Post Navigation"
      >
        <h1 className="text-3xl font-[700] text-gray-600">My Posts</h1>
      </div>
      {isLoading ? (
        <Loader variant="normal" size="normal" text="Loading posts..." />
      ) : (
        <div
          className="w-full flex flex-col justify-start items-start gap-10 p-3"
          role="list"
          aria-label="Post Thumbnails"
        >
          <AnimatePresence>
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((post: Post) => <PostThumb key={post.id} post={post} showUserInfo={false} />)
            ) : (
              <p className="font-[400] text-gray-600">No posts yet</p>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
        <ScrollToTop />
      </div>
    </motion.section>
  );
}

export default MyPosts;
