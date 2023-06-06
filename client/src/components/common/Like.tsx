import { useEffect, useState } from 'react';
import { useBlogContext } from '../../context/BlogContext';
import { Post } from '../../types';
import './Like.css';

interface LikeProps {
  post: Post;
}

function Like({ post }: LikeProps) {
  const { likedPosts, likePost } = useBlogContext();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isPostLiked = likedPosts.find((likedPost) => likedPost.id === post.id);
    if (isPostLiked) setIsLiked(true);
    else setIsLiked(false);
  }, [likedPosts, post]);

  const handleLike = () => {
    likePost(post.id);
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <label className="like_container">
        <input type="checkbox" checked={isLiked} onChange={handleLike} />
        <div className="checkmark">
          <svg viewBox="0 0 256 256">
            <rect fill="none" height="256" width="256"></rect>
            <path
              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
              strokeWidth="20px"
              stroke="#FFF"
              fill="none"
            ></path>
          </svg>
        </div>
      </label>
      <h2 className="text-sm font-[300]">
        {post.likes} {post.likes === 1 ? 'like' : 'likes'}
      </h2>
    </div>
  );
}

export default Like;
