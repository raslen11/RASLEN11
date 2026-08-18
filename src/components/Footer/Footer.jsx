import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaFacebook, FaDiscord, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../../styles/LanguageContext';
import { useTheme } from '../../styles/theme';
import logo from '../../components/Header/Logo_R.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const { theme } = useTheme();

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'Accueil', path: '/' },
    { name: language === 'en' ? 'About' : 'À propos', path: '/about' },
    { name: language === 'en' ? 'Projects' : 'Projets', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: language === 'en' ? 'Contact' : 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <FaGithub />, 
      url: 'https://github.com/raslen11',
      ariaLabel: 'Visit GitHub profile'
    },
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/in/raslen11',
      ariaLabel: 'Visit LinkedIn profile'
    },
    { 
      name: 'X', 
      icon: <FaXTwitter />, 
      url: 'https://twitter.com/raslen11',
      ariaLabel: 'Visit X (Twitter) profile'
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram />, 
      url: 'https://instagram.com/raslen11',
      ariaLabel: 'Visit Instagram profile'
    },
    { 
      name: 'TikTok', 
      icon: <FaTiktok />, 
      url: 'https://tiktok.com/@raslen11',
      ariaLabel: 'Visit TikTok profile'
    },
    { 
      name: 'Facebook', 
      icon: <FaFacebook />, 
      url: 'https://facebook.com/raslen11',
      ariaLabel: 'Visit Facebook profile'
    },
    { 
      name: 'Discord', 
      icon: <FaDiscord />, 
      url: 'https://discord.gg/raslen11',
      ariaLabel: 'Join Discord server'
    },
    { 
      name: 'Email', 
      icon: <FaEnvelope />, 
      url: 'mailto:rkalboussi15@gmail.com',
      ariaLabel: 'Send email'
    },
  ];

  // Split social links into two rows
  const socialLinksRow1 = socialLinks.slice(0, 4);
  const socialLinksRow2 = socialLinks.slice(4);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={`footer theme-${theme}`}
    >
      {/* Grid Background */}
      <div className="footer-grid-bg" />

      {/* Code Decorations */}
      <div className="footer-code-decoration footer-code-left">
        <span className="footer-code-line">{'<footer>'}</span>
        <span className="footer-code-line">{'  <div className="container">'}</span>
        <span className="footer-code-line">{'    <p>© 2026 RASLEN11</p>'}</span>
      </div>
      <div className="footer-code-decoration footer-code-right">
        <span className="footer-code-line">{'  </div>'}</span>
        <span className="footer-code-line">{'</footer>'}</span>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section - Centered */}
          <motion.div 
            className="footer-brand"
            variants={itemVariants}
          >
            <motion.div 
              className="footer-brand-content"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="footer-brand-header">
                <img 
                  src={logo} 
                  alt="R Logo" 
                  className="footer-logo-icon"
                />
                <h3 className="footer-title">
                  <span className="logo-text">RASLEN11</span>
                </h3>
              </div>
              <p className="footer-description">
                {language === 'en' 
                  ? 'Full Stack Developer specializing in modern web technologies and creating exceptional digital experiences.'
                  : 'Développeur Full Stack spécialisé dans les technologies web modernes et la création d\'expériences numériques exceptionnelles.'
                }
              </p>
            </motion.div>
            
            {/* Social Links - Two Rows Centered */}
            <div className="footer-social-wrapper">
              <motion.div 
                className="footer-social footer-social-row-1"
                variants={itemVariants}
              >
                {socialLinksRow1.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.ariaLabel}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.04,
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      y: -3
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

              <motion.div 
                className="footer-social footer-social-row-2"
                variants={itemVariants}
              >
                {socialLinksRow2.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.ariaLabel}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.04 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      y: -3
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Links - Centered */}
          <motion.div 
            className="footer-links"
            variants={itemVariants}
          >
            <h4 className="footer-heading">
              {language === 'en' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="footer-links-list">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.04,
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path} 
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright Section - Centered */}
        <motion.div 
          className="footer-copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.01 }}
        >
          <p>
            {language === 'en' 
              ? `© ${currentYear} RASLEN11. All rights reserved.`
              : `© ${currentYear} RASLEN11. Tous droits réservés.`
            }
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;