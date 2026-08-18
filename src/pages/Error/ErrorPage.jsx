import { useEffect } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
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
    redirect: {
      en: "You'll be automatically redirected to the homepage in 5 seconds...",
      fr: "Vous serez automatiquement redirigé vers la page d'accueil dans 5 secondes..."
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

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className={`error-section theme-${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="error-container"
      >
        <div className="error-content">
          <motion.h1 
            className="error-title"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {translations.title[language]}
          </motion.h1>
          
          <motion.h2 
            className="error-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {translations.subtitle[language]}
          </motion.h2>
          
          <motion.p 
            className="error-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {translations.description[language]}
          </motion.p>
          
          <motion.p 
            className="error-redirect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {translations.redirect[language]}
          </motion.p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => navigate('/')}
              className="error-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <FaHome />
              {translations.button[language]}
            </motion.button>
            
            <motion.button
              onClick={handleGoBack}
              className="error-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ 
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--text-primary)'
              }}
            >
              <FaArrowLeft />
              {translations.backButton[language]}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ErrorPage;