import { useEffect } from 'react';
import './Loader.css';

interface LoaderProps {
  text?: string;
  variant?: 'normal' | 'server';
  size?: 'normal' | 'full';
}

function Loader({ text = 'Loading...', variant = 'normal', size = 'full' }: LoaderProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`${
        size === 'full' && 'fixed top-0 left-0 h-screen'
      } w-full bg-white flex flex-col justify-center items-center gap-5 z-[1000]`}
    >
      <span className={variant}></span>
      <p>{text}</p>
    </div>
  );
}
export default Loader;
