import { format } from 'date-fns';
import { FaUserGraduate } from 'react-icons/fa';
import { Post } from '../../types';
import CategoryBadge from './CategoryBadge';
import Like from './Like';

interface PostThumbPostProps {
  post: Post;
}

function PostThumbPost({ post }: PostThumbPostProps) {
  return (
    <div className="flex-1 w-full flex flex-col justify-start items-start gap-2 p-5 md:px-0 md:pr-3">
      <div className="flex justify-start items-center gap-2">
        <FaUserGraduate className="text-base text-gray-700" />
        {/* USERNAME */}
        <p className="text-xs font-[500]">{post.user.name}</p>
        {/* DATE */}
        <p className="text-xs text-gray-700 font-[400]">{format(new Date(post.createdAt), 'LLLL d, yyyy HH:mm')}</p>
      </div>
      <div className="flex flex-col justify-start items-start gap-1 mt-2">
        {/* TITLE */}
        <h1 className="text-xl font-[600] leading-normal">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h1>
        <div className="flex justify-start items-start gap-5 mb-5 mobile:flex-col">
          {/* BODY */}
          <p className="text-sm font-[300] mt-1">{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
        </div>
      </div>
      <div className="flex justify-start items-center gap-5 mt-auto">
        {/* CATEGORY */}
        <CategoryBadge category={post.category} />
        {/* READ TIME */}
        <p className="text-xs font-[400] text-gray-700">{post.readTime} min read</p>
        <Like post={post} />
      </div>
    </div>
  );
}

export default PostThumbPost;
