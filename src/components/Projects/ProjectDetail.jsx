import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { projects } from '../../utils/ProjectData';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';
import './ProjectDetail.css';

// Import all project images
const importAllImages = (r) => {
  let images = {};
  r.keys().forEach((item, index) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
};

// Import all images from assets directory
const imagesContext = require.context('../../assets', true, /\.(png|jpe?g|gif|svg)$/);
const allImages = importAllImages(imagesContext);

const ProjectDetail = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id, 10));
  
  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Function to extract image filename from path
  const extractImageName = useCallback((path) => {
    if (!path) return null;
    // Extract filename from path like "/src/assets/React/FoodDonation/home.png"
    const parts = path.split('/');
    return parts[parts.length - 1];
  }, []);

  // Function to find image in imported assets
  const findImage = useCallback((imagePath) => {
    if (!imagePath) return null;
    
    const imageName = extractImageName(imagePath);
    if (!imageName) return null;
    
    // Try to find the image in imported assets
    for (const key in allImages) {
      if (key.includes(imageName)) {
        return allImages[key];
      }
    }
    
    // If not found, check if it's a direct path to public folder
    if (imagePath.startsWith('/images/')) {
      return imagePath; // Return as is for public folder images
    }
    
    return null;
  }, [extractImageName]);

  // Initialize images from project data
  useEffect(() => {
    if (project) {
      const allProjectImages = [];
      
      // Add main project image
      if (project.image) {
        const mainImageSrc = findImage(project.image);
        if (mainImageSrc) {
          allProjectImages.push({
            src: mainImageSrc,
            alt: project.title[language],
            type: 'main',
            originalPath: project.image
          });
        }
      }
      
      // Add screenshots if available
      if (project.screenshots) {
        Object.entries(project.screenshots).forEach(([key, screenshotPath]) => {
          const screenshotSrc = findImage(screenshotPath);
          if (screenshotSrc) {
            allProjectImages.push({
              src: screenshotSrc,
              alt: `${project.title[language]} - ${key}`,
              type: 'screenshot',
              label: key,
              originalPath: screenshotPath
            });
          }
        });
      }
      
      // If no images found, create a placeholder
      if (allProjectImages.length === 0) {
        allProjectImages.push({
          src: '/images/project-placeholder.jpg',
          alt: project.title[language],
          type: 'placeholder',
          label: 'No image available'
        });
      }
      
      setImages(allProjectImages);
      setLoadingImages(false);
    }
  }, [project, language, findImage]);

  // Navigation functions for image gallery
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (images.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key) - 1;
        if (num < images.length) {
          goToImage(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, nextImage, prevImage, goToImage]);

  if (!project) {
    return (
      <div className={`project-detail-container ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <div className="project-not-found">
          {language === 'fr' ? 'Projet non trouvé' : 'Project not found'}
        </div>
      </div>
    );
  }

  // Translations
  const translations = {
    backButton: {
      en: "Back to Projects",
      fr: "Retour aux projets"
    },
    demo: {
      en: "Live Demo",
      fr: "Démo en direct"
    },
    code: {
      en: "View Code",
      fr: "Voir le code"
    },
    screenshots: {
      en: "Screenshots",
      fr: "Captures d'écran"
    },
    viewAllScreenshots: {
      en: "View all screenshots",
      fr: "Voir toutes les captures"
    },
    techStack: {
      en: "Technologies Used",
      fr: "Technologies Utilisées"
    },
    next: {
      en: "Next",
      fr: "Suivant"
    },
    prev: {
      en: "Previous",
      fr: "Précédent"
    },
    image: {
      en: "Image",
      fr: "Image"
    },
    of: {
      en: "of",
      fr: "sur"
    },
    loading: {
      en: "Loading images...",
      fr: "Chargement des images..."
    }
  };

  const renderContent = (content, index) => {
    if (typeof content === 'string') {
      return <p key={index}>{content}</p>;
    }
    if (Array.isArray(content)) {
      return content.map((item, i) => <p key={`${index}-${i}`}>{item}</p>);
    }
    if (typeof content === 'object' && content !== null) {
      // Handle content images
      let contentImageSrc = null;
      if (content.image) {
        contentImageSrc = findImage(content.image);
      }
      
      return (
        <motion.div 
          className="project-content-block"
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {content.heading && <h2>{content.heading[language]}</h2>}
          {content.paragraphs?.[language]?.map((para, i) => (
            <p key={`${index}-p-${i}`}>{para}</p>
          ))}
          {content.code && (
            <pre>
              <code>{content.code}</code>
            </pre>
          )}
          {contentImageSrc && (
            <div className="project-content-image">
              <img 
                src={contentImageSrc} 
                alt={content.caption?.[language] || project.title[language]}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/project-placeholder.jpg';
                  e.target.alt = 'Image not available';
                }}
              />
              {content.caption && (
                <p className="image-caption">{content.caption[language]}</p>
              )}
            </div>
          )}
        </motion.div>
      );
    }
    return null;
  };

  // Extract technology tags from content
  const getTechTags = () => {
    const techTags = [];
    
    // Check content for technologies
    project.content?.forEach(contentBlock => {
      if (contentBlock.heading?.[language]?.includes('Technologies') || 
          contentBlock.heading?.[language]?.includes('technologies') ||
          contentBlock.heading?.[language]?.includes('Technologies Utilisées')) {
        contentBlock.paragraphs?.[language]?.forEach(para => {
          // Extract technology names
          const techItems = para.split('\n').map(item => {
            const match = item.match(/^[-•]\s*(.+)/);
            return match ? match[1].trim() : null;
          }).filter(Boolean);
          
          if (techItems.length > 0) {
            techTags.push(...techItems);
          } else {
            // Try another pattern
            const simpleTechs = para.split(/[:,]/).map(item => item.trim())
              .filter(item => item && !item.includes('http') && item.length < 50);
            techTags.push(...simpleTechs);
          }
        });
      }
    });
    
    // Add any technologies from tools_and_technologies if they exist
    if (project.tools_and_technologies) {
      Object.values(project.tools_and_technologies).forEach(category => {
        Object.values(category).forEach(tech => {
          if (typeof tech === 'string') {
            techTags.push(tech);
          }
        });
      });
    }
    
    return [...new Set(techTags.filter(Boolean))]; // Remove duplicates and null values
  };

  const techTags = getTechTags();

  return (
    <div className={`project-detail-container ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="project-detail-wrapper">
        {/* Back Button */}
        <motion.button 
          className="project-back-button" 
          onClick={() => navigate('/projects')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          {translations.backButton[language]}
        </motion.button>

        <motion.article 
          className="project-detail-article"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="project-detail-header">
            <motion.span 
              className="project-detail-category"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {project.category[language]}
            </motion.span>
            
            <motion.h1 
              className="project-detail-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {project.title[language]}
            </motion.h1>
            
            <motion.div 
              className="project-detail-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="project-detail-date">{project.date}</span>
              {project.status && (
                <span className="project-detail-status">
                  • {project.status[language]}
                </span>
              )}
            </motion.div>

            {/* Technology Tags */}
            {techTags.length > 0 && (
              <motion.div 
                className="project-tech-stack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span style={{marginRight: '0.5rem', color: 'var(--pd-text-secondary)'}}>
                  {translations.techStack[language]}:
                </span>
                {techTags.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Image Gallery */}
            {loadingImages ? (
              <motion.div 
                className="gallery-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {translations.loading[language]}
              </motion.div>
            ) : images.length > 0 && (
              <motion.div 
                className="project-image-gallery"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="gallery-header">
                  <h3>
                    {images.length === 1 
                      ? project.title[language] 
                      : `${translations.screenshots[language]} (${images.length})`
                    }
                  </h3>
                  {images.length > 1 && (
                    <div className="gallery-indicator">
                      {translations.image[language]} {currentImageIndex + 1} {translations.of[language]} {images.length}
                    </div>
                  )}
                </div>

                {/* Main Image Display */}
                <div className="gallery-main">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="gallery-image-container"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={images[currentImageIndex].src} 
                        alt={images[currentImageIndex].alt} 
                        className="gallery-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/images/project-placeholder.jpg';
                          e.target.alt = 'Image not available';
                        }}
                      />
                      
                      {/* Image Label */}
                      {images[currentImageIndex].label && (
                        <div className="image-label">
                          {images[currentImageIndex].label}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button 
                        className="gallery-nav-button prev-button"
                        onClick={prevImage}
                        aria-label={translations.prev[language]}
                      >
                        <FaChevronLeft />
                      </button>
                      <button 
                        className="gallery-nav-button next-button"
                        onClick={nextImage}
                        aria-label={translations.next[language]}
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="gallery-thumbnails">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                        aria-label={`${translations.image[language]} ${index + 1}`}
                      >
                        <img 
                          src={img.src} 
                          alt={`${img.alt} - ${index + 1}`}
                          onError={(e) => {
                            e.target.src = '/images/project-placeholder.jpg';
                            e.target.alt = 'Thumbnail not available';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Project Description */}
            <motion.p 
              className="project-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {project.description[language]}
            </motion.p>
          </header>

          {/* Main Content */}
          <div className="project-detail-content">
            {project.content?.map((block, index) => renderContent(block, index))}
          </div>

          {/* Project Links */}
          <div className="project-links">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link github"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                {translations.code[language]}
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt />
                {translations.demo[language]}
              </motion.a>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default ProjectDetail;