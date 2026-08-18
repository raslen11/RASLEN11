import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faMoon, 
  faSun, 
  faLanguage, 
  faArrowUp 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '../../Contexts/ThemeContext';
import { useLanguage } from '../../Contexts/LanguageContext';
import './ToggleButtons.css';

const GlobalControls = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLabels, setShowLabels] = useState({ 
    theme: false, 
    language: false,
    mobileTheme: false,
    mobileLanguage: false 
  });
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowBackToTop(currentScrollPos > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Desktop label handlers
  const showThemeLabel = () => setShowLabels(prev => ({ ...prev, theme: true }));
  const hideThemeLabel = () => setShowLabels(prev => ({ ...prev, theme: false }));
  const showLanguageLabel = () => setShowLabels(prev => ({ ...prev, language: true }));
  const hideLanguageLabel = () => setShowLabels(prev => ({ ...prev, language: false }));

  // Mobile label handlers
  const showMobileThemeLabel = () => setShowLabels(prev => ({ ...prev, mobileTheme: true }));
  const hideMobileThemeLabel = () => setShowLabels(prev => ({ ...prev, mobileTheme: false }));
  const showMobileLanguageLabel = () => setShowLabels(prev => ({ ...prev, mobileLanguage: true }));
  const hideMobileLanguageLabel = () => setShowLabels(prev => ({ ...prev, mobileLanguage: false }));

  return (
    <>
      {/* Top Right Controls - Desktop - Always Visible */}
      <div className="global-controls top-controls">
        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="control-button theme-control"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={showThemeLabel}
          onMouseLeave={hideThemeLabel}
          onTouchStart={() => {
            showThemeLabel();
            setTimeout(hideThemeLabel, 2000);
          }}
        >
          <FontAwesomeIcon 
            icon={theme === 'light' ? faMoon : faSun} 
            className="control-icon"
          />
          <AnimatePresence>
            {showLabels.theme && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.2 }}
                className="control-label"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Language Toggle Button */}
        <motion.button
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          className="control-button language-control"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={showLanguageLabel}
          onMouseLeave={hideLanguageLabel}
          onTouchStart={() => {
            showLanguageLabel();
            setTimeout(hideLanguageLabel, 2000);
          }}
        >
          <FontAwesomeIcon 
            icon={faLanguage} 
            className="control-icon"
          />
          <AnimatePresence>
            {showLabels.language && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.2 }}
                className="control-label"
              >
                {language === 'en' ? 'Français' : 'English'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Controls - Top Right - Always Visible */}
      {isMobile && (
        <div className="mobile-controls-wrapper">
          {/* Theme Toggle - Mobile */}
          <motion.button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="mobile-control"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={showMobileThemeLabel}
            onMouseLeave={hideMobileThemeLabel}
            onTouchStart={() => {
              showMobileThemeLabel();
              setTimeout(hideMobileThemeLabel, 2000);
            }}
          >
            <FontAwesomeIcon 
              icon={theme === 'light' ? faMoon : faSun} 
              className="control-icon"
            />
            <AnimatePresence>
              {showLabels.mobileTheme && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mobile-control-label"
                >
                  {theme === 'light' ? 'Dark' : 'Light'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Language Toggle - Mobile */}
          <motion.button
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
            className="mobile-control"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={showMobileLanguageLabel}
            onMouseLeave={hideMobileLanguageLabel}
            onTouchStart={() => {
              showMobileLanguageLabel();
              setTimeout(hideMobileLanguageLabel, 2000);
            }}
          >
            <FontAwesomeIcon 
              icon={faLanguage} 
              className="control-icon"
            />
            <AnimatePresence>
              {showLabels.mobileLanguage && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mobile-control-label"
                >
                  {language === 'en' ? 'FR' : 'EN'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}

      {/* Back to Top Button - Bottom Right - Shows on scroll */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="back-to-top-control"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon 
              icon={faArrowUp} 
              className="control-icon"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalControls;