// src/pages/About/AboutPage.jsx
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { 
  FaCode,
  FaAward,
  FaGraduationCap,
  FaReact,
  FaDatabase,
  FaServer,
  FaShieldAlt,
  FaRocket,
  FaHeart,
  FaTrophy,
  FaBolt
} from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const translations = {
    badge: {
      en: 'About Me',
      fr: 'À Propos'
    },
    name: "RASLEN11",
    title: {
      en: "Full-Stack Developer & Tech Enthusiast",
      fr: "Développeur Full-Stack & Passionné de Tech"
    },
    subtitle: {
      en: "Passionate About Building Scalable, Impactful Digital Solutions",
      fr: "Passionné par la création de solutions numériques évolutives et percutantes"
    },
    intro: {
      en: "Hello! I am a Full-Stack Developer based in Tunisia with a passion for designing, building, and deploying modern web and mobile applications. Having earned my National License Degree in Information Technology (Information Systems Development) from ISET Kairouan with high honors, I bridge the gap between robust backend systems and intuitive frontend experiences.",
      fr: "Bonjour! Je suis un développeur Full-Stack basé en Tunisie avec une passion pour la conception, la construction et le déploiement d'applications web et mobiles modernes. Après avoir obtenu ma Licence Nationale en Technologie de l'Information (Développement des Systèmes d'Information) de l'ISET Kairouan avec mention, je combine des systèmes backend robustes avec des expériences frontend intuitives."
    },
    goal: {
      en: "My core goal is simple: leverage clean code, optimal architectures, and continuous innovation to solve complex real-world problems. Beyond technical development, I am deeply committed to technology education and aim to inspire the next generation as an IT educator.",
      fr: "Mon objectif principal est simple: utiliser un code propre, des architectures optimales et une innovation continue pour résoudre des problèmes complexes du monde réel. Au-delà du développement technique, je suis profondément engagé dans l'éducation technologique et vise à inspirer la prochaine génération en tant qu'éducateur en informatique."
    },
    stats: {
      experience: {
        en: 'Experience',
        fr: "Expérience"
      },
      projects: {
        en: 'Projects',
        fr: 'Projets'
      },
      awards: {
        en: 'Awards',
        fr: 'Récompenses'
      },
      education: {
        en: 'Education',
        fr: 'Éducation'
      }
    },
    expertise: {
      en: 'Technical Expertise',
      fr: 'Expertise Technique'
    },
    frontend: {
      en: 'Frontend',
      fr: 'Frontend'
    },
    backend: {
      en: 'Backend',
      fr: 'Backend'
    },
    database: {
      en: 'Database & DevOps',
      fr: 'Base de Données & DevOps'
    },
    architecture: {
      en: 'Architecture',
      fr: 'Architecture'
    },
    principles: {
      en: 'Core Principles',
      fr: 'Principes Fondamentaux'
    },
    beyond: {
      en: 'Beyond the Code',
      fr: 'Au-delà du Code'
    }
  };

  const techSkills = {
    frontend: ['React', 'Flutter', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Laravel', 'Java'],
    database: ['MySQL', 'MongoDB', 'Sequelize', 'Docker', 'Git', 'Netlify'],
    architecture: ['RESTful APIs', 'System Design', 'UML Modeling']
  };

  const principles = [
    {
      icon: FaCode,
      title: {
        en: "Clean, Efficient Code",
        fr: "Code Propre et Efficace"
      },
      desc: {
        en: "Prioritizing maintainability, security, and performance in every codebase.",
        fr: "Prioriser la maintenabilité, la sécurité et la performance dans chaque codebase."
      }
    },
    {
      icon: FaRocket,
      title: {
        en: "User-Centered Approach",
        fr: "Approche Centrée sur l'Utilisateur"
      },
      desc: {
        en: "Crafting smooth, responsive user interfaces across mobile and web platforms.",
        fr: "Création d'interfaces utilisateur fluides et responsives sur les plateformes mobiles et web."
      }
    },
    {
      icon: FaBolt,
      title: {
        en: "Continuous Growth",
        fr: "Croissance Continue"
      },
      desc: {
        en: "Constantly exploring emerging technologies, architectural patterns, and industry standards.",
        fr: "Exploration constante des technologies émergentes, des modèles architecturaux et des standards de l'industrie."
      }
    }
  ];

  const beyondCode = [
    {
      icon: FaTrophy,
      title: {
        en: "Taekwondo Black Belt",
        fr: "Ceinture Noire de Taekwondo"
      },
      desc: {
        en: "Maintaining discipline and focus through martial arts.",
        fr: "Maintenir la discipline et la concentration à travers les arts martiaux."
      }
    },
    {
      icon: FaHeart,
      title: {
        en: "Fitness & Gym",
        fr: "Fitness & Salle de Sport"
      },
      desc: {
        en: "Staying active and healthy with regular workouts.",
        fr: "Rester actif et en bonne santé avec des entraînements réguliers."
      }
    },
    {
      icon: FaGraduationCap,
      title: {
        en: "Music Lover",
        fr: "Amateur de Musique"
      },
      desc: {
        en: "Finding inspiration and rhythm through music.",
        fr: "Trouver l'inspiration et le rythme à travers la musique."
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
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
    <section className={`about-section theme-${theme}`}>
      {/* Code Decorations */}
      <div className="about-code-decoration about-code-left">
        <span className="about-code-line">{'<'}</span>
        <span className="about-code-line">{'  <section'}</span>
        <span className="about-code-line">{'    id="about"'}</span>
        <span className="about-code-line">{'  >'}</span>
      </div>
      <div className="about-code-decoration about-code-right">
        <span className="about-code-line">{'  </section>'}</span>
        <span className="about-code-line">{'</>'}</span>
      </div>

      <div className="about-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-content"
        >
          {/* Header */}
          <div className="about-header">
            <motion.div variants={itemVariants} className="about-badge">
              <span className="about-badge-icon">✦</span>
              {translations.badge[language]}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="about-title">
              {translations.name}
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="about-subtitle">
              {translations.title[language]}
            </motion.h2>
            
            <motion.p variants={itemVariants} className="about-description-highlight">
              {translations.subtitle[language]}
            </motion.p>
          </div>

          {/* Intro Section */}
          <motion.div variants={itemVariants} className="about-intro">
            <p className="about-description">{translations.intro[language]}</p>
            <p className="about-description">{translations.goal[language]}</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">5+</span>
              <span className="about-stat-label">{translations.stats.experience[language]}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">20+</span>
              <span className="about-stat-label">{translations.stats.projects[language]}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">3</span>
              <span className="about-stat-label">{translations.stats.awards[language]}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">✓</span>
              <span className="about-stat-label">{translations.stats.education[language]}</span>
            </div>
          </motion.div>

          {/* Technical Expertise */}
          <motion.div variants={itemVariants} className="about-expertise-section">
            <h2 className="about-section-title">
              <FaCode className="about-section-title-icon" />
              {translations.expertise[language]}
            </h2>
            
            <div className="about-expertise-grid">
              <div className="about-expertise-card">
                <div className="about-expertise-icon">
                  <FaReact />
                </div>
                <h3 className="about-expertise-title">{translations.frontend[language]}</h3>
                <div className="about-expertise-tags">
                  {techSkills.frontend.map((skill, i) => (
                    <span key={i} className="about-expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-expertise-card">
                <div className="about-expertise-icon">
                  <FaServer />
                </div>
                <h3 className="about-expertise-title">{translations.backend[language]}</h3>
                <div className="about-expertise-tags">
                  {techSkills.backend.map((skill, i) => (
                    <span key={i} className="about-expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-expertise-card">
                <div className="about-expertise-icon">
                  <FaDatabase />
                </div>
                <h3 className="about-expertise-title">{translations.database[language]}</h3>
                <div className="about-expertise-tags">
                  {techSkills.database.map((skill, i) => (
                    <span key={i} className="about-expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="about-expertise-card">
                <div className="about-expertise-icon">
                  <FaShieldAlt />
                </div>
                <h3 className="about-expertise-title">{translations.architecture[language]}</h3>
                <div className="about-expertise-tags">
                  {techSkills.architecture.map((skill, i) => (
                    <span key={i} className="about-expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Principles */}
          <motion.div variants={itemVariants} className="about-principles-section">
            <h2 className="about-section-title">
              <FaAward className="about-section-title-icon" />
              {translations.principles[language]}
            </h2>
            <div className="about-principles-grid">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  className="about-principle-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="about-principle-icon">
                    <principle.icon />
                  </div>
                  <h3 className="about-principle-title">{principle.title[language]}</h3>
                  <p className="about-principle-desc">{principle.desc[language]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Beyond the Code */}
          <motion.div variants={itemVariants} className="about-beyond-section">
            <h2 className="about-section-title">
              <FaHeart className="about-section-title-icon" />
              {translations.beyond[language]}
            </h2>
            <div className="about-beyond-grid">
              {beyondCode.map((item, index) => (
                <motion.div
                  key={index}
                  className="about-beyond-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="about-beyond-icon">
                    <item.icon />
                  </div>
                  <h3 className="about-beyond-title">{item.title[language]}</h3>
                  <p className="about-beyond-desc">{item.desc[language]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;