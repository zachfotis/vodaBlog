import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dummyUser } from '../dummyData';
import { Category, Post } from '../types';
import { useAuthContext } from './AuthContext';

interface BlogContextProps {
  posts: Post[];
}

interface BlogContextProviderProps {
  children: React.ReactNode;
}

const BlogContext = createContext<BlogContextProps>({} as BlogContextProps);

const useBlogContext = () => useContext(BlogContext);

function BlogContextProvider({ children }: BlogContextProviderProps) {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();

      const modifiedData: Post[] = data.map((post: any): Post => {
        return {
          id: post.id?.toString() || '',
          title: post.title || '',
          body: post.body || '',
          category: Object.values(Category)[Math.floor(Math.random() * Object.values(Category).length)],
          readTime: 5,
          createdAt: new Date(),
          user: dummyUser,
        };
      });
      setPosts(modifiedData);
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const providerValues = useMemo(() => {
    return { posts };
  }, [posts]);
  return <BlogContext.Provider value={providerValues}>{children}</BlogContext.Provider>;
}

export { useBlogContext };

export default BlogContextProvider;
