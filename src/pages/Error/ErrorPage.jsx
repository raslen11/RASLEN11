import { useTheme } from '../../Contexts/ThemeContext';
import { useLanguage } from '../../Contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaCode } from 'react-icons/fa';
import './ErrorPage.css';

const ErrorPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const translations = {
    title: {
      en: "404",
      fr: "404"
    },
    subtitle: {
      en: "Page Not Found",
      fr: "Page Non Trouvée"
    },
    description: {
      en: "The page you're looking for doesn't exist or has been moved.",
      fr: "La page que vous recherchez n'existe pas ou a été déplacée."
    },
    button: {
      en: "Return Home",
      fr: "Retour à l'Accueil"
    },
    backButton: {
      en: "Go Back",
      fr: "Retour"
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className={`error-section theme-${theme}`}>
      {/* Grid Background */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* Code Decorations - Multiple Positions */}
      
      {/* Top Left - Import Statements */}
      <div className="error-code-decoration error-code-top-left">
        <span className="error-code-line">{'import React from "react"'}</span>
        <span className="error-code-line">{'import { useNavigate } from "react-router-dom"'}</span>
        <span className="error-code-line">{'import { motion } from "framer-motion"'}</span>
        <span className="error-code-line">{'import "./ErrorPage.css"'}</span>
        <span className="error-code-line">{''}</span>
        <span className="error-code-line">{'const ErrorPage = () => {'}</span>
        <span className="error-code-line">{'  const navigate = useNavigate()'}</span>
      </div>

      {/* Top Right - Navigation Functions */}
      <div className="error-code-decoration error-code-top-right">
        <span className="error-code-line">{'const handleGoBack = () => {'}</span>
        <span className="error-code-line">{'  navigate(-1)'}</span>
        <span className="error-code-line">{'}'}</span>
        <span className="error-code-line">{''}</span>
        <span className="error-code-line">{'const handleGoHome = () => {'}</span>
        <span className="error-code-line">{'  navigate("/")'}</span>
        <span className="error-code-line">{'}'}</span>
      </div>

      {/* Left Side - HTML Structure */}
      <div className="error-code-decoration error-code-left">
        <span className="error-code-line">{'<'}</span>
        <span className="error-code-line">{'  <div'}</span>
        <span className="error-code-line">{'    className="error"'}</span>
        <span className="error-code-line">{'  >'}</span>
        <span className="error-code-line">{'    <header>'}</span>
        <span className="error-code-line">{'      <h1>'}</span>
        <span className="error-code-line">{'        404'}</span>
        <span className="error-code-line">{'      </h1>'}</span>
        <span className="error-code-line">{'    </header>'}</span>
        <span className="error-code-line">{'    <main>'}</span>
        <span className="error-code-line">{'      <section'}</span>
        <span className="error-code-line">{'        className="error-page"'}</span>
        <span className="error-code-line">{'      >'}</span>
      </div>

      {/* Right Side - Closing Tags */}
      <div className="error-code-decoration error-code-right">
        <span className="error-code-line">{'      </section>'}</span>
        <span className="error-code-line">{'    </main>'}</span>
        <span className="error-code-line">{'    <footer>'}</span>
        <span className="error-code-line">{'      <p>'}</span>
        <span className="error-code-line">{'        © 2026 RASLEN11'}</span>
        <span className="error-code-line">{'      </p>'}</span>
        <span className="error-code-line">{'    </footer>'}</span>
        <span className="error-code-line">{'  </div>'}</span>
        <span className="error-code-line">{'</>'}</span>
      </div>

      {/* Bottom Left - CSS Styles */}
      <div className="error-code-decoration error-code-bottom-left">
        <span className="error-code-line">{'.error {'}</span>
        <span className="error-code-line">{'  display: flex;'}</span>
        <span className="error-code-line">{'  flex-direction: column;'}</span>
        <span className="error-code-line">{'  align-items: center;'}</span>
        <span className="error-code-line">{'  min-height: 100vh;'}</span>
        <span className="error-code-line">{'  padding: 2rem;'}</span>
        <span className="error-code-line">{'  background: #000;'}</span>
        <span className="error-code-line">{'  color: #fff;'}</span>
        <span className="error-code-line">{'}'}</span>
      </div>

      {/* Bottom Right - Export */}
      <div className="error-code-decoration error-code-bottom-right">
        <span className="error-code-line">{'.error-page {'}</span>
        <span className="error-code-line">{'  animation: fadeIn 0.8s ease;'}</span>
        <span className="error-code-line">{'  transform: translateY(0);'}</span>
        <span className="error-code-line">{'  transition: all 0.3s;'}</span>
        <span className="error-code-line">{'}'}</span>
        <span className="error-code-line">{''}</span>
        <span className="error-code-line">{'export default ErrorPage'}</span>
      </div>

      <div className="error-container">
        <div className="error-content-wrapper">
          {/* Status Badge */}
          <motion.div 
            className="error-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="error-badge-icon">⚠</span>
            <span className="error-badge-text">
              {language === 'en' ? 'Error' : 'Erreur'}
            </span>
          </motion.div>

          {/* Error Number */}
          <motion.div 
            className="error-number"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {translations.title[language]}
          </motion.div>
          
          {/* Error Subtitle */}
          <motion.h2 
            className="error-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaCode className="error-subtitle-icon" />
            {translations.subtitle[language]}
          </motion.h2>
          
          {/* Error Description */}
          <motion.p 
            className="error-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {translations.description[language]}
          </motion.p>
          
          {/* Buttons */}
          <motion.div 
            className="error-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="error-button error-button-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome className="error-button-icon" />
              {translations.button[language]}
            </motion.button>
            
            <motion.button
              onClick={handleGoBack}
              className="error-button error-button-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="error-button-icon" />
              {translations.backButton[language]}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;