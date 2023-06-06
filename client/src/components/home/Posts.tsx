import { useEffect, useState } from 'react';
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
    <section
      className="w-full max-w-[1280px] mx-auto flex flex-col justify-start items-start gap-10 p-5"
      role="region"
      aria-label="Main Content"
    >
      <div
        className="w-full flex flex-col justify-start items-start gap-10 mt-5"
        role="navigation"
        aria-label="New Post Navigation"
      >
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
      <div className="w-full flex flex-col justify-start items-center gap-10" role="list" aria-label="Post Thumbnails">
        {selectedPosts.length > 0 ? (
          selectedPosts.map((post) => <PostThumb key={post.id} post={post} />)
        ) : (
          <p className="font-[400] text-gray-600">No posts yet</p>
        )}
      </div>
      <div className="fixed right-5 bottom-5" role="navigation" aria-label="Scroll To Top Navigation">
        <ScrollToTop />
      </div>
    </section>
  );
}

export default Posts;
