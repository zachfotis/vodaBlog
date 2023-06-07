import { BsChatSquareText } from 'react-icons/bs';
import { FaSuitcase, FaUserGraduate } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdAlternateEmail, MdPhone } from 'react-icons/md';
import { TbTargetArrow, TbWorldWww } from 'react-icons/tb';
import { Post } from '../../types';
import Map from './Map';

interface PostThumbProps {
  post: Post;
}
function PostThumbUser({ post }: PostThumbProps) {
  const position: [number, number] = post.user.address?.geo
    ? [Number(post.user.address?.geo.lat), Number(post.user.address?.geo.lng)]
    : [0, 0];

  const suite = post.user.address?.suite || '';
  const street = post.user.address?.street || '';
  const city = post.user.address?.city || '';
  const zipcode = post.user.address?.zipcode || '';

  const address = `${suite} ${street}, ${city} ${zipcode}`;

  return (
    <div className="flex-1 w-full flex flex-col justify-start items-start gap-0 md:flex-row md:gap-5">
      {/* User Info */}
      <div className="flex-1 max-w-[350px] flex flex-col justify-start items-start gap-3 py-5 pl-5 md:pl-0">
        {/* USERNAME */}
        <div className="flex justify-start items-center gap-5">
          <FaUserGraduate className="text-base text-gray-700" />
          <p className="text-sm font-[500]">{post?.user?.name || 'Not Available'}</p>
        </div>
        {/* EMAIL */}
        <div className="flex justify-start items-center gap-5">
          <MdAlternateEmail className="text-base text-gray-700" />
          <a href={`mailto:${post?.user?.email}`} className="text-sm text-gray-700 font-[400]">
            {post?.user?.email || 'Not Available'}
          </a>
        </div>
        {/* ADDRESS */}
        <div className="flex justify-start items-center gap-5">
          <IoLocationSharp className="text-base text-gray-700" />
          <a
            href={`https://www.google.com/maps/place/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 font-[400]"
          >
            {(suite && street && city && zipcode && address) || 'Not Available'}
          </a>
        </div>
        {/* PHONE */}
        <div className="flex justify-start items-center gap-5">
          <MdPhone className="text-base text-gray-700" />
          <a href={`tel:${post?.user?.phone}`} className="text-sm text-gray-700 font-[400]">
            {post?.user?.phone || 'Not Available'}
          </a>
        </div>
        {/* WEBSITE */}
        <div className="flex justify-start items-center gap-5">
          <TbWorldWww className="text-base text-gray-700" />
          <a
            href={`https://${post?.user?.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 font-[400]"
          >
            {post?.user?.website || 'Not Available'}
          </a>
        </div>
      </div>
      {/* Company Info */}
      <div className="flex-1 max-w-[350px] flex flex-col justify-start items-start gap-3 py-5 pl-5 md:pl-0">
        {/* COMPANY NAME */}
        <div className="flex justify-start items-center gap-5">
          <FaSuitcase className="text-base text-gray-700" />
          <p className="text-sm font-[500]">{post?.user?.company?.name || 'Not Available'}</p>
        </div>
        {/* CATCH PHRASE */}
        <div className="flex justify-start items-center gap-5">
          <BsChatSquareText className="text-base text-gray-700" />
          <p className="text-sm text-gray-700 font-[400]">{post?.user?.company?.catchPhrase || 'Not Available'}</p>
        </div>
        {/* BS */}
        <div className="flex justify-start items-center gap-5">
          <TbTargetArrow className="text-base text-gray-700" />
          <p className="text-sm text-gray-700 font-[400]">{post?.user?.company?.bs || 'Not Available'}</p>
        </div>
      </div>
      {/* Map */}
      {position[0] !== 0 && position[1] !== 0 && (
        <div className="flex-1 h-full z-0 hidden md:block">
          <Map position={position} userZoom={15} draggable={false} />
        </div>
      )}
    </div>
  );
}

export default PostThumbUser;
