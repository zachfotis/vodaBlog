import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cover from '../components/profile/Cover';
import Info from '../components/profile/Info';
import Timeline from '../components/profile/Timeline';
import { useAuthContext } from '../context/AuthContext';
import { User } from '../types';

const initializeUser = (user: User | null) => {
  user = user || {
    id: '0',
    name: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  const dummyUser: User = {
    id: user.id || '0',
    name: user.name || '',
    email: user.email || '',
    address: {
      street: user.address?.street || '',
      suite: user.address?.suite || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || '',
      geo: {
        lat: user.address?.geo?.lat || '',
        lng: user.address?.geo?.lng || '',
      },
    },
    phone: user.phone || '',
    website: user.website || '',
    company: {
      name: user.company?.name || '',
      catchPhrase: user.company?.catchPhrase || '',
      bs: user.company?.bs || '',
    },
  };
  return dummyUser;
};

function Profile() {
  const { user } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<User>(initializeUser(user));
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Redirect to login page if user is not logged in
  if (!user || !currentUser) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="flex-1 w-full max-w-[1280px] mx-auto flex flex-col justify-start items-start gap-14 p-5 md:p-10"
        role="region"
        aria-label="Main Content"
      >
        <Cover
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <Info currentUser={currentUser} setCurrentUser={setCurrentUser} isEditing={isEditing} />
        <Timeline />
      </motion.section>
    );
  }
}

export default Profile;
