import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import UserLogo from '../../assets/user3d.png';
import { useAuthContext } from '../../context/AuthContext';
import { User } from '../../types';
import Map from '../common/Map';
interface IProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cover({ currentUser, setCurrentUser, isEditing, setIsEditing }: IProps) {
  const { updateUser } = useAuthContext();
  const [position, setPosition] = useState<[number, number]>([
    Number(currentUser?.address?.geo.lat) || 37.9838,
    Number(currentUser?.address?.geo.lng) || 23.7275,
  ]);
  const [userZoom, setUserZoom] = useState<number>(10);

  useEffect(() => {
    if (!currentUser?.address) return;

    setCurrentUser({
      ...currentUser,
      address: {
        ...currentUser.address,
        geo: {
          lat: String(position[0]),
          lng: String(position[1]),
        },
      },
    });
  }, [position]);

  return (
    <div className="w-full flex flex-col justify-start items-start md:items-center gap-24 md:gap-5">
      <div className="relative flex w-full h-[300px] bg-gray-200 rounded-md">
        <div className="w-full h-full z-0 overflow-hidden rounded-md shadow-sm">
          <Map position={position} setPosition={setPosition} userZoom={userZoom} setUserZoom={setUserZoom} />
        </div>
        {/* Avatar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 md:bottom-0 md:left-5 transform md:translate-x-0 md:translate-y-[60%] w-[150px] h-[150px] bg-transparent overflow-hidden z-20">
          <img src={UserLogo} alt="Avatar" className="w-full h-full object-cover object-center" />
        </div>
      </div>
      {/* Details */}
      <div className="relative w-full md:pl-[200px] flex flex-col justify-center items-center md:justify-start md:items-start gap-2">
        <h2 className="text-2xl font-[700] text-gray-600">{currentUser.name}</h2>
        <p className="text-lg font-[500] text-gray-600">{currentUser.email}</p>
        {!isEditing ? (
          <BiEdit
            className="md:absolute bottom-0 top-0 right-0 text-2xl text-gray-600 cursor-pointer mt-2"
            onClick={() => setIsEditing(!isEditing)}
          />
        ) : (
          <button
            className="md:absolute bottom-0 top-0 right-0 btn btn-sm btn-success btn-outline mt-2"
            onClick={() => {
              setIsEditing(!isEditing);
              updateUser(currentUser);
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default Cover;
