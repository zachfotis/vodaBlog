import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
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
  fetchMyPosts: () => Promise<void>;
  myPosts: Post[];
  isLoading: boolean;
  fetchMorePosts: () => Promise<void>;
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
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchPosts(10);
      fetchLikedPosts();
    }
  }, [user]);

  useEffect(() => {
    clearInterval(pollingInterval);
    setPollingInterval(null);

    if (user && posts.length > 0) {
      // Fetch posts every 5 seconds
      const interval = setInterval(() => {
        fetchPosts(posts.length);
      }, 5000);

      setPollingInterval(interval);
    }

    return () => {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    };
  }, [user, posts]);

  // Post Handling Functions
  const fetchPosts = async (numberOfPosts: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + `/posts/specific/${numberOfPosts}`, {
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

      // If there are no posts, set posts to empty array
      if (posts.length === 0) {
        dispatchPosts({ type: 'SET_POSTS', payload: modifiedData });
        return;
      } else {
        // WHEN A POST IS DELETED
        // Check if there is a post in posts that is not in modifiedData and delete it
        posts.forEach((post) => {
          const postInModifiedData = modifiedData.find((p) => p.id === post.id);
          if (!postInModifiedData) {
            dispatchPosts({ type: 'DELETE_POST', payload: post.id });
            // Refetch liked posts and my posts
            fetchLikedPosts();
            fetchMyPosts();
          }
        });

        // WHEN A POST IS ADDED OR UPDATED
        // Check if post in posts in posts and update it, if new add it
        modifiedData.forEach((post) => {
          const postInPosts = posts.find((p) => p.id === post.id);
          if (postInPosts) {
            // Check if post has different number of likes and update it
            if (postInPosts.likes !== post.likes) {
              dispatchPosts({ type: 'UPDATE_POST', payload: post });
            }
          } else {
            dispatchPosts({ type: 'ADD_POST', payload: post });
          }
        });
      }

      // Check if post in likedPosts and update it
      modifiedData.forEach((post) => {
        const likedPost = likedPosts.find((likedPost) => likedPost.id === post.id);
        if (likedPost) {
          dispatchLikedPosts({ type: 'UPDATE_LIKED_POST', payload: post });
        }
      });

      // Check if post in myPosts and update it
      modifiedData.forEach((post) => {
        const myPost = myPosts.find((myPost) => myPost.id === post.id);
        if (myPost) {
          setMyPosts((prev) => {
            const index = prev.findIndex((post) => post.id === myPost.id);
            const updatedPosts = [...prev];
            updatedPosts[index] = post;
            return updatedPosts;
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMorePosts = useCallback(async () => {
    // Pagination
    const skip = posts.length;
    const limit = 10;

    // Create query string
    const query = `?skip=${skip}&limit=${limit}`;

    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts' + query, {
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

      dispatchPosts({ type: 'ADD_POSTS', payload: modifiedData });
    } catch (error) {
      console.log(error);
    }
  }, [posts.length]);

  const fetchLikedPosts = useCallback(async () => {
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
    }
  }, []);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/posts/my-posts', {
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

      setMyPosts(modifiedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

        // Find the post in the myPosts array and update its likes
        const postIndex3 = myPosts.findIndex((post) => post.id === postId);
        if (postIndex3 !== -1) {
          setMyPosts((prev) => {
            const updatedPosts = [...prev];
            updatedPosts[postIndex3].likes = modifiedData.likes;
            return updatedPosts;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [likedPosts, posts, myPosts]
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

        await response.json();

        // Find post in the posts array and delete it
        const postIndex = posts.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
          dispatchPosts({ type: 'DELETE_POST', payload: postId });
        }

        // Find post in the likedPosts array and delete it
        const postIndex2 = likedPosts.findIndex((post) => post.id === postId);
        if (postIndex2 !== -1) {
          dispatchLikedPosts({ type: 'DELETE_LIKED_POST', payload: postId });
        }

        // Find post in the myPosts array and delete it
        const postIndex3 = myPosts.findIndex((post) => post.id === postId);
        if (postIndex3 !== -1) {
          setMyPosts((prev) => {
            const updatedPosts = [...prev];
            updatedPosts.splice(postIndex3, 1);
            return updatedPosts;
          });
        }

        toast.success('Post deleted successfully');
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
      toast.success('Post created successfully');
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
      fetchMyPosts,
      myPosts,
      isLoading,
      fetchMorePosts,
    };
  }, [
    posts,
    likedPosts,
    likePost,
    categories,
    selectedCategories,
    createNewPost,
    deletePost,
    myPosts,
    isLoading,
    fetchMorePosts,
  ]);
  return <BlogContext.Provider value={providerValues}>{children}</BlogContext.Provider>;
}

export { useBlogContext };

export default BlogContextProvider;
