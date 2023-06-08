import { BsChatSquareText } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdPhone } from 'react-icons/md';
import { TbTargetArrow, TbWorldWww } from 'react-icons/tb';
import { User } from '../../types';

interface IProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  isEditing: boolean;
}

function Info({ currentUser, setCurrentUser, isEditing }: IProps) {
  const inputClasses = isEditing
    ? 'w-full text-gray-700 font-[400] bg-transparent border border-gray-500 focus:outline-none py-2 px-3 rounded-md'
    : 'w-full text-gray-700 font-[400] bg-transparent border border-gray-300 focus:outline-none py-2 px-3 rounded-md';

  const inputClassesSmall = isEditing
    ? 'w-[50%] text-gray-700 font-[400] bg-transparent border border-gray-500 focus:outline-none py-2 px-3 rounded-md'
    : 'w-[50%] text-gray-700 font-[400] bg-transparent border border-gray-300 focus:outline-none py-2 px-3 rounded-md';

  const iconClasses = 'text-2xl text-gray-700';
  return (
    <div className="w-full flex flex-col justify-start items-start gap-10 md:flex-row lg:gap-24 px-5 mt-5 flex-wrap">
      {/* User Info */}
      <div className="w-full flex-1 flex flex-col justify-start items-start gap-5">
        <h3 className="text-xl font-[700] text-gray-600">User Info</h3>
        {/* ADDRESS */}
        <div className="w-full flex justify-start items-center gap-5">
          <IoLocationSharp className={iconClasses} />
          <input
            type="text"
            className={inputClassesSmall}
            placeholder="suite"
            value={currentUser.address?.suite}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.address) {
                setCurrentUser({
                  ...currentUser,
                  address: {
                    ...currentUser.address,
                    suite: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
          <input
            type="text"
            className={inputClassesSmall}
            placeholder="street"
            value={currentUser.address?.street}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.address) {
                setCurrentUser({
                  ...currentUser,
                  address: {
                    ...currentUser.address,
                    street: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full flex justify-start items-center gap-5">
          <IoLocationSharp className={iconClasses} />
          <input
            type="text"
            className={inputClassesSmall}
            placeholder="city"
            value={currentUser.address?.city}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.address) {
                setCurrentUser({
                  ...currentUser,
                  address: {
                    ...currentUser.address,
                    city: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
          <input
            type="text"
            className={inputClassesSmall}
            placeholder="zipcode"
            value={currentUser.address?.zipcode}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.address) {
                setCurrentUser({
                  ...currentUser,
                  address: {
                    ...currentUser.address,
                    zipcode: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
        </div>
        {/* PHONE */}
        <div className="w-full flex justify-start items-center gap-5">
          <MdPhone className={iconClasses} />
          <input
            type="text"
            className={inputClasses}
            placeholder="phone"
            value={currentUser?.phone || ''}
            onChange={(e) => {
              if (!currentUser) return;

              setCurrentUser({
                ...currentUser,
                phone: e.target.value,
              });
            }}
            disabled={!isEditing}
          />
        </div>
        {/* WEBSITE */}
        <div className="w-full flex justify-start items-center gap-5">
          <TbWorldWww className={iconClasses} />
          <input
            type="text"
            className={inputClasses}
            placeholder="website"
            value={currentUser.website || ''}
            onChange={(e) => {
              if (!currentUser) return;

              setCurrentUser({
                ...currentUser,
                website: e.target.value,
              });
            }}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Company Info */}
      <div className="w-full flex-1 flex flex-col justify-start items-start gap-5">
        <h3 className="text-xl font-[700] text-gray-600">Company Info</h3>
        {/* COMPANY NAME */}
        <div className="w-full flex justify-start items-center gap-5">
          <FaSuitcase className={iconClasses} />
          <input
            type="text"
            className={inputClasses}
            placeholder="company name"
            value={currentUser.company?.name}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.company) {
                setCurrentUser({
                  ...currentUser,
                  company: {
                    ...currentUser.company,
                    name: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
        </div>
        {/* CATCH PHRASE */}
        <div className="w-full flex justify-start items-center gap-5">
          <BsChatSquareText className={iconClasses} />
          <input
            type="text"
            className={inputClasses}
            placeholder="catch phrase"
            value={currentUser.company?.catchPhrase}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.company) {
                setCurrentUser({
                  ...currentUser,
                  company: {
                    ...currentUser.company,
                    catchPhrase: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
        </div>
        {/* BS */}
        <div className="w-full flex justify-start items-center gap-5">
          <TbTargetArrow className={iconClasses} />
          <input
            type="text"
            className={inputClasses}
            placeholder="bs"
            value={currentUser.company?.bs}
            onChange={(e) => {
              if (!currentUser) return;

              if (currentUser.company) {
                setCurrentUser({
                  ...currentUser,
                  company: {
                    ...currentUser.company,
                    bs: e.target.value,
                  },
                });
              }
            }}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}

export default Info;
