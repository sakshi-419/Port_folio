import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollableHeight = docHeight - windowHeight;

      if (totalScrollableHeight > 0) {
        const scrolled = (window.scrollY / totalScrollableHeight) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-light-pink/30 z-50 pointer-events-none">
      <div 
        className="h-full pink-gradient transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
