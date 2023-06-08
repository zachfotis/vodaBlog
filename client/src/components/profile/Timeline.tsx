import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useBlogContext } from '../../context/BlogContext';
import { Post } from '../../types';
import PostThumb from '../common/PostThumb';
import ScrollToTop from '../common/ScrollToTop';

function Timeline() {
  const { myPosts, fetchMyPosts } = useBlogContext();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5 mt-5">
      <h2 className="w-full text-center md:text-left text-2xl font-[700] text-gray-600">Timeline</h2>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <div
          className="w-full flex flex-col justify-start items-start gap-10 py-3"
          role="list"
          aria-label="Post Thumbnails"
        >
          <AnimatePresence>
            {myPosts && myPosts.length > 0 ? (
              myPosts
                .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((post: Post) => <PostThumb key={post.id} post={post} showUserInfo={false} />)
            ) : (
              <p className="w-full text-center font-[400] text-gray-600 pt-5">No posts yet</p>
            )}
          </AnimatePresence>
        </div>
        <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
          <ScrollToTop />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
