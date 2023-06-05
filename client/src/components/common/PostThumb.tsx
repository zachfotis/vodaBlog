import { format } from 'date-fns';
import { FaUserGraduate } from 'react-icons/fa';
import { Post } from '../../types';
import CategoryBadge from './CategoryBadge';
import Like from './Like';

interface PostThumbProps {
  post: Post;
}

function PostThumb({ post }: PostThumbProps) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 mt-5">
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
        <div className="flex justify-start items-start gap-5 mobile:flex-col">
          {/* BODY */}
          <p className="text-sm font-[300] mt-1">{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
        </div>
      </div>
      <div className="flex justify-start items-center gap-5 mt-2 mobile:mt-5">
        {/* CATEGORY */}
        <CategoryBadge category={post.category} />
        {/* READ TIME */}
        <p className="text-xs font-[400] text-gray-700">{post.readTime} min read</p>
        <Like />
      </div>
      {/* SEPARATOR */}
      <span className="w-full h-[1px] bg-gray-300 rounded-lg shadow-lg mt-5"></span>
    </div>
  );
}

export default PostThumb;
