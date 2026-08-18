import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { projects } from '../../utils/ProjectData';
import { useNavigate } from 'react-router-dom';
import './ProjectsPage.css';

// Import project images
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

const projectImages = {
  1: foodDonationImg,
  2: cofatDashboardImg,
  3: salmaPortfolioImg,
  4: raslenPortfolioImg,
  5: paymentSystemImg,
  6: dictatorsAppFlutterImg,
  7: dictatorsAppImg,
  8: myStoreImg,
  9: meteoAppImg,
  10: cofatLaravel,
  11: foodDonationImg,
};

const ProjectsPage = ({ isHomepage = false }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState({});

  const displayedProjects = isHomepage ? projects.slice(0, 3) : projects;

  const translations = {
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
    }
  };

  const getProjectImage = (projectId) => {
    return projectImages[projectId] || '/images/project-placeholder.jpg';
  };

  const handleImageLoad = (projectId) => {
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageLoadStart = (projectId) => {
    setImageLoading(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <section className={`projects-section theme-${theme}`}>
      {/* Grid Background */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* Code Decorations */}
      <div className="projects-code-decoration projects-code-top-left">
        <span className="projects-code-line">{'import React from "react"'}</span>
        <span className="projects-code-line">{'import { useState } from "react"'}</span>
        <span className="projects-code-line">{'import { motion } from "framer-motion"'}</span>
        <span className="projects-code-line">{'import { projects } from "./data"'}</span>
        <span className="projects-code-line">{''}</span>
        <span className="projects-code-line">{'const ProjectsPage = () => {'}</span>
        <span className="projects-code-line">{'  const [projects, setProjects] = useState([])'}</span>
      </div>

      <div className="projects-code-decoration projects-code-top-right">
        <span className="projects-code-line">{'useEffect(() => {'}</span>
        <span className="projects-code-line">{'  const fetchProjects = async () => {'}</span>
        <span className="projects-code-line">{'    const res = await fetch("/api/projects")'}</span>
        <span className="projects-code-line">{'    const data = await res.json()'}</span>
        <span className="projects-code-line">{'    setProjects(data)'}</span>
        <span className="projects-code-line">{'  }'}</span>
        <span className="projects-code-line">{'  fetchProjects()'}</span>
        <span className="projects-code-line">{'}, [])'}</span>
      </div>

      <div className="projects-code-decoration projects-code-left">
        <span className="projects-code-line">{'<'}</span>
        <span className="projects-code-line">{'  <div'}</span>
        <span className="projects-code-line">{'    className="projects"'}</span>
        <span className="projects-code-line">{'  >'}</span>
        <span className="projects-code-line">{'    <header>'}</span>
        <span className="projects-code-line">{'      <h1>'}</span>
        <span className="projects-code-line">{'        My Projects'}</span>
        <span className="projects-code-line">{'      </h1>'}</span>
        <span className="projects-code-line">{'    </header>'}</span>
        <span className="projects-code-line">{'    <main>'}</span>
        <span className="projects-code-line">{'      <section'}</span>
        <span className="projects-code-line">{'        className="project-grid"'}</span>
        <span className="projects-code-line">{'      >'}</span>
      </div>

      <div className="projects-code-decoration projects-code-right">
        <span className="projects-code-line">{'      </section>'}</span>
        <span className="projects-code-line">{'    </main>'}</span>
        <span className="projects-code-line">{'    <footer>'}</span>
        <span className="projects-code-line">{'      <p>'}</span>
        <span className="projects-code-line">{'        © 2026 RASLEN11'}</span>
        <span className="projects-code-line">{'      </p>'}</span>
        <span className="projects-code-line">{'    </footer>'}</span>
        <span className="projects-code-line">{'  </div>'}</span>
        <span className="projects-code-line">{'</>'}</span>
      </div>

      <div className="projects-code-decoration projects-code-bottom-left">
        <span className="projects-code-line">{'.projects {'}</span>
        <span className="projects-code-line">{'  display: grid;'}</span>
        <span className="projects-code-line">{'  grid-template-columns: repeat(3, 1fr);'}</span>
        <span className="projects-code-line">{'  gap: 2rem;'}</span>
        <span className="projects-code-line">{'  padding: 2rem;'}</span>
        <span className="projects-code-line">{'  background: #000;'}</span>
        <span className="projects-code-line">{'  color: #fff;'}</span>
        <span className="projects-code-line">{'}'}</span>
      </div>

      <div className="projects-code-decoration projects-code-bottom-right">
        <span className="projects-code-line">{'.project-card {'}</span>
        <span className="projects-code-line">{'  border-radius: 16px;'}</span>
        <span className="projects-code-line">{'  overflow: hidden;'}</span>
        <span className="projects-code-line">{'  transition: all 0.3s;'}</span>
        <span className="projects-code-line">{'}'}</span>
        <span className="projects-code-line">{''}</span>
        <span className="projects-code-line">{'export default ProjectsPage'}</span>
      </div>

      <div className="projects-container">
        {!isHomepage && (
          <motion.h2
            className="projects-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {translations.title[language]}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.4, 0, 0.2, 1]
                }}
                viewport={{ once: true }}
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
                      }}
                    />
                    {imageLoading[project.id] && (
                      <div className="project-card-image-loading" />
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
            className="projects-view-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="projects-view-all-button"
              onClick={() => navigate('/projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.viewAll[language]}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;