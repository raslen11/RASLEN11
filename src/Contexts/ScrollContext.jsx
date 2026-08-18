// src/contexts/ScrollContext.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollContext = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollContext;