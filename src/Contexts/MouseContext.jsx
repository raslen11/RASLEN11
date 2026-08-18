import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

const MouseContext = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
      setIsVisible(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsHovering(false);
        setIsVisible(false);
      }, 300);
    };

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && isHovering && (
        <motion.div
          className={`mouse-glow mouse-glow-${theme}`}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.4,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }
          }}
        >
          <div className="mouse-glow-inner" />
          <div className="mouse-glow-outer" />
          <div className="mouse-glow-ring" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MouseContext;