import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme'; // Fixed path
import { useLanguage } from '../../styles/LanguageContext'; // Fixed path
import { projects } from '../../utils/ProjectData';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectsPage.css';

// Import project images - ensure these files exist in your assets folder
import foodDonationImg from '../../assets/food-donation.png';
import cofatDashboardImg from '../../assets/cofat-dashboard.png';
import salmaPortfolioImg from '../../assets/React/Salma Portfolio/salma-portfolio-1.png';
import raslenPortfolioImg from '../../assets/React/Raslen Portfolio/raslen-portfolio-1.png';
import paymentSystemImg from '../../assets/payment-system.png';
import dictatorsAppFlutterImg from '../../assets/dictators-app.png';
import dictatorsAppImg from '../../assets/Dictators App/dictators-app.png';
import myStoreImg from '../../assets/my-store.png';
import meteoAppImg from '../../assets/meteoApp.png';
import cofatLaravel from '../../assets/cofat-laravel.png';

// Create image mapping object
const projectImages = {
  1: foodDonationImg,
  2: cofatDashboardImg,
  3: salmaPortfolioImg,
  4: raslenPortfolioImg,
  5: paymentSystemImg,
  6: dictatorsAppFlutterImg,
  7:dictatorsAppImg,
  8: myStoreImg,
  9: meteoAppImg,
  10: cofatLaravel,
  11: foodDonationImg,
};

const ProjectsPage = ({ isHomepage = false }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  
  const displayedProjects = isHomepage ? projects.slice(0, 3) : projects;

  const translations = {
    backButton: {
      en: "← Back to Projects",
      fr: "← Retour aux projets"
    },
    title: {
      en: "Featured ",
      fr: "Projets "
    },
    highlight: {
      en: "Projects",
      fr: "mis en avant"
    },
    viewAll: {
      en: "View All Projects",
      fr: "Voir tous les projets"
    },
    defaultContent: {
      en: "Project details are being updated. Please check back soon for more information about this project.",
      fr: "Les détails du projet sont en cours de mise à jour. Revenez bientôt pour plus d'informations sur ce projet."
    },
    technologies: {
      en: "Technologies:",
      fr: "Technologies :"
    }
  };

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === parseInt(id, 10));
      setSelectedProject(project || null);
    } else {
      setSelectedProject(null);
    }
  }, [id]);

  const handleImageLoad = (projectId) => {
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageLoadStart = (projectId) => {
    setImageLoading(prev => ({ ...prev, [projectId]: true }));
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    navigate('/projects');
  };

  const getProjectImage = (projectId) => {
    return projectImages[projectId] || '/images/project-placeholder.jpg';
  };

  // Extract technologies for display
  const extractTechnologies = (project) => {
    const techSet = new Set();
    
    project.content?.forEach(contentBlock => {
      if (contentBlock.heading?.[language]?.toLowerCase().includes('technologie') || 
          contentBlock.heading?.[language]?.toLowerCase().includes('technology')) {
        
        contentBlock.paragraphs?.[language]?.forEach(para => {
          // Extract main technologies (first few items)
          const lines = para.split('\n');
          lines.forEach(line => {
            // Look for technology patterns
            if (line.includes(':') || line.includes('•')) {
              const tech = line.split(':')[0]?.replace(/^[-•\d.]\s*/, '').trim();
              if (tech && tech.length > 0 && tech.length < 30) {
                techSet.add(tech);
              }
            }
          });
        });
      }
    });
    
    return Array.from(techSet).slice(0, 5); // Limit to 5 technologies
  };

  if (selectedProject) {
    const projectImage = getProjectImage(selectedProject.id);
    const projectTechs = extractTechnologies(selectedProject);
    
    return (
      <section
        className={`projects-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${isHomepage ? 'projects-section-home' : ''}`}
        id="projects"
      >
        <div className="projects-container">
          <motion.button
            onClick={handleBackToList}
            className="projects-back-button"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {translations.backButton[language]}
          </motion.button>

          <motion.article 
            className="project-detail-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="project-detail-header">
              <div className="project-detail-meta">
                <span className="project-category">{selectedProject.category[language]}</span>
                <span className="project-date">{selectedProject.date}</span>
              </div>
              
              <h1 className="project-title">
                {selectedProject.title[language]}
              </h1>
              
              <div className="project-detail-image-container">
                <img
                  src={projectImage}
                  alt={selectedProject.title[language] || 'Project detailed view'}
                  className="project-detail-image"
                  loading="eager"
                  onLoad={() => handleImageLoad(selectedProject.id)}
                />
              </div>
            </header>
            
            {/* Project Description */}
            <div className="project-detail-description">
              <p>{selectedProject.description[language]}</p>
            </div>
            
            {/* Technologies */}
            {projectTechs.length > 0 && (
              <div className="project-technologies">
                <h3 className="technologies-title">
                  {translations.technologies[language]}
                </h3>
                <div className="technologies-tags">
                  {projectTechs.map((tech, index) => (
                    <span 
                      key={index}
                      className="technology-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="project-detail-actions">
              <button
                className="project-back-action"
                onClick={handleBackToList}
              >
                Back to Projects
              </button>
              {(selectedProject.github || selectedProject.demo) && (
                <div className="project-links">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link demo-link"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`projects-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${isHomepage ? 'projects-section-home' : ''}`}
      id="projects"
    >
      <div className="projects-container">
        {!isHomepage && (
          <motion.h2
            className="projects-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            {translations.title[language]}{' '}
            <span className="projects-title-highlight">
              {translations.highlight[language]}
            </span>
          </motion.h2>
        )}

        <div className={`projects-grid ${isHomepage ? 'projects-grid-home' : 'projects-grid-full'}`}>
          {displayedProjects.map((project, index) => {
            const projectImage = getProjectImage(project.id);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="project-card-wrapper"
              >
                <div
                  className="project-card"
                  onClick={() => navigate(`/projects/${project.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/projects/${project.id}`);
                    }
                  }}
                >
                  <div className="project-card-image-container">
                    <img
                      src={projectImage}
                      alt={project.title[language] || 'Project preview'}
                      className="project-card-image"
                      loading="lazy"
                      onLoad={() => handleImageLoad(project.id)}
                      onLoadStart={() => handleImageLoadStart(project.id)}
                      onError={(e) => {
                        e.target.src = '/images/project-placeholder.jpg';
                        e.target.alt = 'Image not available';
                      }}
                    />
                    {imageLoading[project.id] && (
                      <div className="project-card-image-loading"></div>
                    )}
                  </div>
                  <div className="project-card-content">
                    <div className="project-card-header">
                      <span className="project-category">{project.category[language]}</span>
                      <span className="project-date">{project.date}</span>
                    </div>
                    <h3 className="project-card-title">{project.title[language]}</h3>
                    <p className="project-card-description">{project.description[language]}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {isHomepage && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.4
              }
            }}
            viewport={{ once: true }}
            className="projects-view-all"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="projects-view-all-button"
                onClick={() => navigate('/projects')}
                aria-label={translations.viewAll[language]}
              >
                {translations.viewAll[language]}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;