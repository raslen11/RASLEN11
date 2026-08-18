import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaProjectDiagram, FaBlog, FaEnvelope
} from 'react-icons/fa';
import { useTheme } from '../../Contexts/ThemeContext';
import logo from '../../assets/profile.jpg';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaUser },
    { name: 'Projects', path: '/projects', icon: FaProjectDiagram },
    { name: 'Blog', path: '/blog', icon: FaBlog },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ];

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`header theme-${theme} ${isMobile ? 'header-mobile-hidden' : ''}`}
      >
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="header-logo-link" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="header-logo"
              >
                <img src={logo} alt="Logo" className="header-logo-icon" />
                <span className="logo-text">RASLEN11</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="header-desktop-links" aria-label="Main navigation">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={link.path}
                    className={`header-link ${
                      location.pathname === link.path
                        ? 'header-link-active'
                        : 'header-link-inactive'
                    }`}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="header-mobile-menu"
            >
              <nav className="header-mobile-links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`header-mobile-link ${
                        location.pathname === link.path
                          ? 'header-mobile-link-active'
                          : 'header-mobile-link-inactive'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Top Navigation Bar - Always visible on mobile */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={`mobile-top-nav theme-${theme}`}
        >
          <div className="mobile-top-nav-container">
            {/* Logo and Name - Centered */}
            <Link to="/" className="mobile-top-nav-logo" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="mobile-top-nav-brand"
              >
                <img src={logo} alt="Logo" className="mobile-top-nav-icon" />
                <span className="mobile-top-nav-name">RASLEN11</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className={`bottom-nav theme-${theme}`}
          aria-label="Bottom navigation"
        >
          <div className="bottom-nav-container">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <motion.div
                    className="bottom-nav-icon-wrapper"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="bottom-nav-icon" />
                  </motion.div>
                  <span className="bottom-nav-label">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Header;