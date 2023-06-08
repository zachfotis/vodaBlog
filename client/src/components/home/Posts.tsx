import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BannerImage from '../../assets/banner.jpg';
import { useAuthContext } from '../../context/AuthContext';
import { useBlogContext } from '../../context/BlogContext';
import { Post } from '../../types';
import PostThumb from '../common/PostThumb';
import ScrollToTop from '../common/ScrollToTop';
import Categories from './Categories';
import NewPostForm from './NewPostForm';

function Posts() {
  const { user } = useAuthContext();
  const { posts, selectedCategories } = useBlogContext();
  const [selectedPosts, setSelectedPosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (selectedCategories.length === 0) return setSelectedPosts(posts);
    const selectedPosts = posts.filter((post) => {
      return selectedCategories.some((selectedCategory) => post.category.includes(selectedCategory));
    });
    setSelectedPosts(selectedPosts);
  }, [posts, selectedCategories]);

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
        className="w-full flex flex-col justify-start items-start gap-10"
        role="navigation"
        aria-label="New Post Navigation"
      >
        {/* Banner */}
        <div className="w-full flex justify-center items-center rounded-sm overflow-hidden shadow-md">
          <img
            src={BannerImage}
            alt="Pipe"
            className="w-full h-[400px] object-cover object-center
            transition-all duration-500 ease-in-out transform hover:scale-105
            filter brightness-100 hover:brightness-110
          "
          />
        </div>
        <h1 className="text-3xl font-[700] text-gray-600">Welcome {user?.name.split(' ')[0] || ''}</h1>
        <NewPostForm />
      </div>
      <div
        className="w-full flex flex-col justify-start items-start gap-3"
        role="navigation"
        aria-label="Categories Navigation"
      >
        <h2 className="text-2xl font-[700] text-gray-800">Latest Posts</h2>
        <Categories posts={posts} />
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-12" role="list" aria-label="Post Thumbnails">
        <AnimatePresence>
          {selectedPosts.length > 0 ? (
            selectedPosts
              .sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              })
              .map((post, index) => <PostThumb key={post.id} post={post} index={index} />)
          ) : (
            <p className="font-[400] text-gray-600">No posts yet</p>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
        <ScrollToTop />
      </div>
    </motion.section>
  );
}

export default Posts;
