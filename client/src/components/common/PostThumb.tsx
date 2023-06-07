import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { RiMessage2Fill } from 'react-icons/ri';
import { useAuthContext } from '../../context/AuthContext';
import { useBlogContext } from '../../context/BlogContext';
import { Post } from '../../types';
import PostThumbPost from './PostThumbPost';
import PostThumbUser from './PostThumbUser';

interface PostThumbProps {
  post: Post;
}

function PostThumb({ post }: PostThumbProps) {
  const { user } = useAuthContext();
  const { deletePost } = useBlogContext();
  const [showPost, setShowPost] = useState(true);
  const [showUser, setShowUser] = useState(false);

  return (
    <div
      className="relative w-full min-h-[280px] md:min-h-[220px] flex flex-col-reverse justify-start items-stretch gap-3
      shadow-md rounded-md overflow-hidden md:flex-row md:gap-7"
    >
      {/* Left Part */}
      <div className="flex h-8 md:flex-col md:h-auto">
        <button
          className={`flex-1 w-full flex justify-center items-center px-3 cursor-pointer ${
            showPost ? 'bg-slate-600' : 'bg-slate-100'
          }`}
          onClick={() => {
            setShowPost(true);
            setShowUser(false);
          }}
        >
          <RiMessage2Fill className={`text-xl ${showPost ? 'text-white' : 'text-black'}`} />
        </button>
        <button
          className={`flex-1 w-full flex justify-center items-center px-3 cursor-pointer ${
            showUser ? 'bg-slate-600' : 'bg-slate-100'
          }`}
          onClick={() => {
            setShowPost(false);
            setShowUser(true);
          }}
        >
          <IoLocationSharp className={`text-2xl ${showUser ? 'text-white' : 'text-black'}`} />
        </button>
      </div>
      {/* Right Part */}
      {showPost && <PostThumbPost post={post} />}
      {showUser && <PostThumbUser post={post} />}

      {/* Delete Post */}
      {user && user.id === post.user.id && (
        <div className="absolute top-3 right-2 dropdown dropdown-end">
          <label tabIndex={0}>
            <BiDotsVerticalRounded className="text-2xl text-black-700 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />
          </label>
          <ul tabIndex={0} className="mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-md">
            <li className="relative w-full">
              <button className="w-full px-5 rounded-md" onClick={() => deletePost(post.id)}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostThumb;
