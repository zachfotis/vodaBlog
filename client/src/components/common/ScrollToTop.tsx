import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      className="bg-slate-600 py-2 px-4 rounded"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <IconContext.Provider value={{ color: 'white', size: '1.5em' }}>
        <FaArrowUp />
      </IconContext.Provider>
    </button>
  );
}

export default ScrollToTop;
