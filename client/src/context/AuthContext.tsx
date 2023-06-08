import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import { CustomError, LoginUser, RegisterUser, User } from '../types';

interface AuthContextProps {
  user: User | null;
  login: (user: LoginUser) => Promise<void>;
  register: (user: RegisterUser) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const useAuthContext = () => useContext(AuthContext);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const data = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/auth/currentuser', {
          credentials: 'include',
        });
        const res = await data.json();

        if (res?.currentUser?.id && res?.currentUser?.email && res?.currentUser?.name) {
          const user: User = res.currentUser;
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) getCurrentUser();
  }, []);

  // Memoize the provider values so that they don't change on every render
  const providerValues = useMemo(() => {
    // Login function
    const login = async (user: LoginUser) => {
      setLoading(true);
      try {
        const data = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
          credentials: 'include',
        });
        const res = await data.json();

        const errors: CustomError[] = res?.errors;

        if (errors && errors.length > 0) {
          res.errors.forEach((error: CustomError) => toast.error(error.message));
        }

        if (res?.id && res?.email && res?.name) {
          const user: User = res;
          setUser(user);
          toast.success('Login successful');
        }
      } catch (error) {
        console.log(error);
        toast.error('Login failed');
      } finally {
        setLoading(false);
      }
    };

    // Logout function
    const logout = async () => {
      setLoading(true);
      try {
        const data = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/auth/signout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const res = await data.json();

        const errors: CustomError[] = res?.errors;

        if (errors && errors.length > 0) {
          res.errors.forEach((error: CustomError) => toast.error(error.message));
        }

        setUser(null);
        toast.success('Logout successful');
      } catch (error) {
        console.log(error);
        toast.error('Logout failed');
      } finally {
        setLoading(false);
      }
    };

    // Register function
    const register = async (user: RegisterUser) => {
      setLoading(true);
      try {
        const data = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
          credentials: 'include',
        });
        const res = await data.json();

        const errors: CustomError[] = res?.errors;

        if (errors && errors.length > 0) {
          res.errors.forEach((error: CustomError) => toast.error(error.message));
        }

        if (res?.id && res?.email && res?.name) {
          const user: User = res;
          setUser(user);
          toast.success('Registration successful');
        }
      } catch (error) {
        console.log(error);
        toast.error('Registration failed');
      } finally {
        setLoading(false);
      }
    };

    // Update User function
    const updateUser = async (user: User) => {
      setLoading(true);

      try {
        const data = await fetch(import.meta.env.VITE_SERVER_AUTH_URL + '/auth/updateuser', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
          credentials: 'include',
        });
        const res = await data.json();

        const errors: CustomError[] = res?.errors;

        if (errors && errors.length > 0) {
          res.errors.forEach((error: CustomError) => toast.error(error.message));
        }

        if (res?.id && res?.email && res?.name) {
          const user: User = res;
          setUser(user);
          toast.success('User updated successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('User update failed');
      } finally {
        setLoading(false);
      }
    };

    return { user, login, logout, register, updateUser };
  }, [user]);

  return (
    <AuthContext.Provider value={providerValues}>
      {loading && <Loader variant="normal" />}
      {children}
    </AuthContext.Provider>
  );
}

export { useAuthContext };
export default AuthContextProvider;
