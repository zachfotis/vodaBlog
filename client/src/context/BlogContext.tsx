import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { likedPostsReducer } from '../reducers/LikedPostsReducer';
import { postsReducer } from '../reducers/PostsReducer';
import { Category, Post } from '../types';
import { useAuthContext } from './AuthContext';

interface BlogContextProps {
  posts: Post[];
  likedPosts: Post[];
  likePost: (postId: string) => Promise<void>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  createNewPost: (title: string, body: string, category: Category) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

interface BlogContextProviderProps {
  children: React.ReactNode;
}

const BlogContext = createContext<BlogContextProps>({} as BlogContextProps);

const useBlogContext = () => useContext(BlogContext);

function BlogContextProvider({ children }: BlogContextProviderProps) {
  const { user } = useAuthContext();
  const [posts, dispatchPosts] = useReducer(postsReducer, []);
  const [likedPosts, dispatchLikedPosts] = useReducer(likedPostsReducer, []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchLikedPosts();
    }
  }, [user]);

  useEffect(() => {
    // Long polling for new posts
    const interval = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Post Functions
  const fetchPosts = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts/', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      const modifiedData: Post[] = data
        .map((post: any): Post => {
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            category: post.category,
            readTime: post.readTime,
            createdAt: post.createdAt,
            likes: post.likes,
            user: post.userId,
          };
        })
        .sort((a: Post, b: Post) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

      dispatchPosts({ type: 'SET_POSTS', payload: modifiedData });

      // check if post in likedPosts and update it
      modifiedData.forEach((post) => {
        const likedPost = likedPosts.find((likedPost) => likedPost.id === post.id);
        if (likedPost) {
          dispatchLikedPosts({ type: 'UPDATE_LIKED_POST', payload: post });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }, []);

  const fetchLikedPosts = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts/liked', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      const modifiedData: Post[] = data
        .map((post: any): Post => {
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            category: post.category,
            readTime: post.readTime,
            createdAt: post.createdAt,
            likes: post.likes,
            user: post.userId,
          };
        })
        .sort((a: Post, b: Post) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

      dispatchLikedPosts({ type: 'SET_LIKED_POSTS', payload: modifiedData });
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }, []);

  const likePost = useCallback(
    async (postId: string) => {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
          credentials: 'include',
        });

        const data = await response.json();

        const modifiedData: Post = {
          id: data.id,
          title: data.title,
          body: data.body,
          category: data.category,
          readTime: data.readTime,
          createdAt: data.createdAt,
          likes: data.likes,
          user: data.userId,
        };

        // FInd the post in the likedPosts array and add it or remove it
        const postIndex = likedPosts.findIndex((post) => post.id === postId);
        if (postIndex === -1) {
          dispatchLikedPosts({ type: 'ADD_LIKED_POST', payload: modifiedData });
        }
        if (postIndex !== -1) {
          dispatchLikedPosts({ type: 'DELETE_LIKED_POST', payload: postId });
        }

        // Find the post in the posts array and update its likes
        const postIndex2 = posts.findIndex((post) => post.id === postId);
        if (postIndex2 !== -1) {
          dispatchPosts({ type: 'UPDATE_POST', payload: modifiedData });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [likedPosts, posts]
  );

  const deletePost = useCallback(
    async (postId: string) => {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
          credentials: 'include',
        });

        const data = await response.json();

        const modifiedData: Post = {
          id: data.id,
          title: data.title,
          body: data.body,
          category: data.category,
          readTime: data.readTime,
          createdAt: data.createdAt,
          likes: data.likes,
          user: data.userId,
        };

        // Find the post in the posts array and delete it
        const postIndex = posts.findIndex((post) => post.id === modifiedData.id);
        if (postIndex !== -1) {
          dispatchPosts({ type: 'DELETE_POST', payload: postId });
        }

        // Find the post in the likedPosts array and delete it
        const postIndex2 = likedPosts.findIndex((post) => post.id === postId);
        if (postIndex2 !== -1) {
          dispatchLikedPosts({ type: 'DELETE_LIKED_POST', payload: postId });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [likedPosts, posts]
  );

  const createNewPost = useCallback(async (title: string, body: string, category: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, category }),
        credentials: 'include',
      });

      const data = await response.json();

      const modifiedData: Post = {
        id: data.id,
        title: data.title,
        body: data.body,
        category: data.category,
        readTime: data.readTime,
        createdAt: data.createdAt,
        likes: data.likes,
        user: data.userId,
      };

      dispatchPosts({ type: 'ADD_POST', payload: modifiedData });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const providerValues = useMemo(() => {
    return {
      posts,
      likedPosts,
      likePost,
      categories,
      setCategories,
      selectedCategories,
      setSelectedCategories,
      createNewPost,
      deletePost,
    };
  }, [posts, likedPosts, likePost, categories, selectedCategories]);
  return <BlogContext.Provider value={providerValues}>{children}</BlogContext.Provider>;
}

export { useBlogContext };

export default BlogContextProvider;
