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
  r.keys().forEach((item) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
};

// Import all images from assets directory
const imagesContext = require.context('../../assets', true, /\.(png|jpe?g|gif|svg|jpeg)$/);
const allImages = importAllImages(imagesContext);

const ProjectDetail = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id, 10));
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const extractImageName = useCallback((path) => {
    if (!path) return null;
    const parts = path.split('/');
    return parts[parts.length - 1];
  }, []);

  const findImage = useCallback((imagePath) => {
    if (!imagePath) return null;
    
    const imageName = extractImageName(imagePath);
    if (!imageName) return null;
    
    for (const key in allImages) {
      if (key.includes(imageName)) {
        return allImages[key];
      }
    }
    
    if (imagePath.startsWith('/images/')) {
      return imagePath;
    }
    
    return null;
  }, [extractImageName]);

  useEffect(() => {
    if (project) {
      const allProjectImages = [];
      
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

  useEffect(() => {
    if (images.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, nextImage, prevImage]);

  if (!project) {
    return (
      <div className={`project-detail-container theme-${theme}`}>
        <div className="grid-background" />
        <div className="grid-glow" />
        <div className="project-detail-wrapper">
          <div className="pd-not-found">
            <h2>{language === 'fr' ? 'Projet non trouvé' : 'Project not found'}</h2>
            <p>{language === 'fr' ? 'Le projet que vous recherchez n\'existe pas.' : 'The project you are looking for does not exist.'}</p>
            <button className="pd-back-button" onClick={() => navigate('/projects')}>
              <FaArrowLeft /> {language === 'fr' ? 'Retour aux projets' : 'Back to Projects'}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      let contentImageSrc = null;
      if (content.image) {
        contentImageSrc = findImage(content.image);
      }
      
      return (
        <motion.div 
          className="pd-content-block"
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
            <div className="pd-content-image">
              <img 
                src={contentImageSrc} 
                alt={content.caption?.[language] || project.title[language]}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/project-placeholder.jpg';
                }}
              />
              {content.caption && (
                <p className="pd-image-caption">{content.caption[language]}</p>
              )}
            </div>
          )}
        </motion.div>
      );
    }
    return null;
  };

  const getTechTags = () => {
    const techTags = [];
    
    project.content?.forEach(contentBlock => {
      if (contentBlock.heading?.[language]?.toLowerCase().includes('technologies')) {
        contentBlock.paragraphs?.[language]?.forEach(para => {
          const techItems = para.split('\n').map(item => {
            const match = item.match(/^[-•]\s*(.+)/);
            return match ? match[1].trim() : null;
          }).filter(Boolean);
          
          if (techItems.length > 0) {
            techTags.push(...techItems);
          } else {
            const simpleTechs = para.split(/[:,]/).map(item => item.trim())
              .filter(item => item && !item.includes('http') && item.length < 50);
            techTags.push(...simpleTechs);
          }
        });
      }
    });
    
    if (project.tools_and_technologies) {
      Object.values(project.tools_and_technologies).forEach(category => {
        Object.values(category).forEach(tech => {
          if (typeof tech === 'string') {
            techTags.push(tech);
          }
        });
      });
    }
    
    return [...new Set(techTags.filter(Boolean))];
  };

  const techTags = getTechTags();

  return (
    <div className={`project-detail-container theme-${theme}`}>
      {/* Grid Background */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* Code Decorations */}
      <div className="pd-code-decoration pd-code-top-left">
        <span className="pd-code-line">{'import { useState } from "react"'}</span>
        <span className="pd-code-line">{'import { useParams } from "react-router-dom"'}</span>
        <span className="pd-code-line">{'import { motion } from "framer-motion"'}</span>
        <span className="pd-code-line">{'import { projects } from "./data"'}</span>
        <span className="pd-code-line">{''}</span>
        <span className="pd-code-line">{'const ProjectDetail = () => {'}</span>
        <span className="pd-code-line">{'  const { id } = useParams()'}</span>
      </div>

      <div className="pd-code-decoration pd-code-top-right">
        <span className="pd-code-line">{'useEffect(() => {'}</span>
        <span className="pd-code-line">{'  const fetchProject = async () => {'}</span>
        <span className="pd-code-line">{'    const res = await fetch(`/api/projects/${id}`)'}</span>
        <span className="pd-code-line">{'    const data = await res.json()'}</span>
        <span className="pd-code-line">{'    setProject(data)'}</span>
        <span className="pd-code-line">{'  }'}</span>
        <span className="pd-code-line">{'  fetchProject()'}</span>
        <span className="pd-code-line">{'}, [id])'}</span>
      </div>

      <div className="pd-code-decoration pd-code-left">
        <span className="pd-code-line">{'<'}</span>
        <span className="pd-code-line">{'  <div'}</span>
        <span className="pd-code-line">{'    className="project-detail"'}</span>
        <span className="pd-code-line">{'  >'}</span>
        <span className="pd-code-line">{'    <header>'}</span>
        <span className="pd-code-line">{'      <h1>'}</span>
        <span className="pd-code-line">{'        Project Detail'}</span>
        <span className="pd-code-line">{'      </h1>'}</span>
        <span className="pd-code-line">{'    </header>'}</span>
        <span className="pd-code-line">{'    <main>'}</span>
        <span className="pd-code-line">{'      <section'}</span>
        <span className="pd-code-line">{'        className="project-content"'}</span>
        <span className="pd-code-line">{'      >'}</span>
      </div>

      <div className="pd-code-decoration pd-code-right">
        <span className="pd-code-line">{'      </section>'}</span>
        <span className="pd-code-line">{'    </main>'}</span>
        <span className="pd-code-line">{'    <footer>'}</span>
        <span className="pd-code-line">{'      <p>'}</span>
        <span className="pd-code-line">{'        \u00A9 2026 RASLEN11'}</span>
        <span className="pd-code-line">{'      </p>'}</span>
        <span className="pd-code-line">{'    </footer>'}</span>
        <span className="pd-code-line">{'  </div>'}</span>
        <span className="pd-code-line">{'</>'}</span>
      </div>

      <div className="pd-code-decoration pd-code-bottom-left">
        <span className="pd-code-line">{'.project-detail {'}</span>
        <span className="pd-code-line">{'  max-width: 900px;'}</span>
        <span className="pd-code-line">{'  margin: 0 auto;'}</span>
        <span className="pd-code-line">{'  padding: 2rem;'}</span>
        <span className="pd-code-line">{'  background: #000;'}</span>
        <span className="pd-code-line">{'  color: #fff;'}</span>
        <span className="pd-code-line">{'  border-radius: 20px;'}</span>
        <span className="pd-code-line">{'}'}</span>
      </div>

      <div className="pd-code-decoration pd-code-bottom-right">
        <span className="pd-code-line">{'.project-content {'}</span>
        <span className="pd-code-line">{'  animation: fadeIn 0.5s ease;'}</span>
        <span className="pd-code-line">{'  transform: translateY(0);'}</span>
        <span className="pd-code-line">{'  transition: all 0.3s;'}</span>
        <span className="pd-code-line">{'}'}</span>
        <span className="pd-code-line">{''}</span>
        <span className="pd-code-line">{'export default ProjectDetail'}</span>
      </div>

      <div className="project-detail-wrapper">
        {/* Back Button */}
        <motion.button 
          className="pd-back-button" 
          onClick={() => navigate('/projects')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          {translations.backButton[language]}
        </motion.button>

        <motion.article 
          className="pd-article"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="pd-header">
            <motion.span 
              className="pd-category"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {project.category[language]}
            </motion.span>
            
            <motion.h1 
              className="pd-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {project.title[language]}
            </motion.h1>
            
            <motion.div 
              className="pd-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span>{project.date}</span>
              {project.status && (
                <span>• {project.status[language]}</span>
              )}
            </motion.div>

            {/* Technology Tags */}
            {techTags.length > 0 && (
              <motion.div 
                className="pd-tech-stack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="pd-tech-stack-label">
                  {translations.techStack[language]}:
                </span>
                {techTags.slice(0, 8).map((tech, index) => (
                  <span key={index} className="pd-tech-tag">
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Image Gallery */}
            {loadingImages ? (
              <motion.div 
                className="pd-gallery-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {translations.loading[language]}
              </motion.div>
            ) : images.length > 0 && (
              <motion.div 
                className="pd-gallery"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="pd-gallery-header">
                  <h3>
                    {images.length === 1 
                      ? project.title[language] 
                      : `${translations.screenshots[language]} (${images.length})`
                    }
                  </h3>
                  {images.length > 1 && (
                    <span className="pd-gallery-indicator">
                      {translations.image[language]} {currentImageIndex + 1} {translations.of[language]} {images.length}
                    </span>
                  )}
                </div>

                <div className="pd-gallery-main">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="pd-gallery-image-container"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={images[currentImageIndex].src} 
                        alt={images[currentImageIndex].alt} 
                        className="pd-gallery-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/images/project-placeholder.jpg';
                        }}
                      />
                      {images[currentImageIndex].label && (
                        <div className="pd-gallery-image-label">
                          {images[currentImageIndex].label}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button 
                        className="pd-gallery-nav prev"
                        onClick={prevImage}
                        aria-label={translations.prev[language]}
                      >
                        <FaChevronLeft />
                      </button>
                      <button 
                        className="pd-gallery-nav next"
                        onClick={nextImage}
                        aria-label={translations.next[language]}
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="pd-gallery-thumbnails">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        className={`pd-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                        aria-label={`${translations.image[language]} ${index + 1}`}
                      >
                        <img 
                          src={img.src} 
                          alt={`${img.alt} - ${index + 1}`}
                          onError={(e) => {
                            e.target.src = '/images/project-placeholder.jpg';
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
              className="pd-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {project.description[language]}
            </motion.p>
          </header>

          {/* Main Content */}
          <div className="pd-content">
            {project.content?.map((block, index) => renderContent(block, index))}
          </div>

          {/* Project Links */}
          <div className="pd-links">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-link github"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
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
                className="pd-link demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
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