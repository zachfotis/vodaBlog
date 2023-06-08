import { AnimatePresence, motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import BannerImage from '../assets/like.jpg';
import PostThumb from '../components/common/PostThumb';
import ScrollToTop from '../components/common/ScrollToTop';
import { useAuthContext } from '../context/AuthContext';
import { useBlogContext } from '../context/BlogContext';
import { Post } from '../types';
function LikedPosts() {
  const { user } = useAuthContext();
  const { likedPosts, unlikeAllPosts } = useBlogContext();

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
      {/* Banner */}
      <div className="w-full flex justify-center items-center rounded-sm overflow-hidden shadow-md">
        <img
          src={BannerImage}
          alt="Pipe"
          className="w-full h-[300px] object-cover object-center
            transition-all duration-500 ease-in-out transform hover:scale-105
            filter brightness-100 hover:brightness-110"
        />
      </div>
      <div
        className="w-full flex flex-col justify-start items-start gap-10 mt-5"
        role="navigation"
        aria-label="New Post Navigation"
      >
        <h1 className="mx-auto md:mx-0 text-3xl font-[700] text-gray-600">Liked Posts</h1>
        {/* Unlike all button */}
        {likedPosts.length > 0 && (
          <button
            className="mx-auto md:mx-0 px-3 py-2 rounded-sm shadow-md bg-gray-100 hover:bg-gray-200
          transition-all duration-500 ease-in-out transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => {
              unlikeAllPosts();
            }}
          >
            Unlike All
          </button>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-10" role="list" aria-label="Post Thumbnails">
        <AnimatePresence>
          {likedPosts.length > 0 ? (
            likedPosts.map((post: Post) => <PostThumb key={post.id} post={post} />)
          ) : (
            <p className="w-full text-center font-[400] text-gray-600">No posts yet</p>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
        <ScrollToTop />
      </div>
    </motion.section>
  );
}

export default LikedPosts;
