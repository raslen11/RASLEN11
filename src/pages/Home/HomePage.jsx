import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { 
  FaArrowRight, FaEnvelope, FaCode, FaGithub, FaLinkedin, 
  FaTwitter, FaReact, FaNodeJs, FaPython, FaDocker,
  FaDatabase, FaCloud, FaGitAlt, FaTerminal, FaCss3, FaHtml5
} from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiGraphql, SiTailwindcss } from 'react-icons/si';
import './HomePage.css';

const HomePage = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const techSectionRef = useRef(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const roles = useMemo(() => [
    language === 'en' ? 'Full Stack Developer' : 'Développeur Full Stack',
    language === 'en' ? 'Code Architect' : 'Architecte Code',
    language === 'en' ? 'Problem Solver' : 'Résolveur de Problèmes',
    language === 'en' ? 'Tech Enthusiast' : 'Passionné de Tech',
    language === 'en' ? 'Innovation Builder' : 'Bâtisseur d\'Innovation',
  ], [language]);

  const translations = useMemo(() => ({
    title: {
      en: "Hi, I'm",
      fr: "Bonjour, je suis"
    },
    name: "RASLEN11",
    description: {
      en: "I craft exceptional digital experiences through clean code, innovative solutions, and a passion for technology.",
      fr: "Je crée des expériences numériques exceptionnelles grâce à un code propre, des solutions innovantes et une passion pour la technologie."
    },
    cta: {
      viewWork: {
        en: "View My Work",
        fr: "Voir mes projets"
      },
      contact: {
        en: "Contact Me",
        fr: "Me contacter"
      }
    },
    status: {
      en: "Available for work",
      fr: "Disponible pour projets"
    },
    scroll: {
      en: "SCROLL TO EXPLORE",
      fr: "DÉFILEZ POUR EXPLORER"
    },
    tech: {
      badge: {
        en: "Tech Stack",
        fr: "Stack Technique"
      },
      title: {
        en: "Tools I Work With",
        fr: "Outils que j'utilise"
      },
      subtitle: {
        en: "Modern technologies and frameworks I use to build exceptional digital experiences.",
        fr: "Technologies et frameworks modernes que j'utilise pour créer des expériences numériques exceptionnelles."
      }
    }
  }), []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Typing animation for roles
  useEffect(() => {
    const speed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const currentRole = roles[loopIndex % roles.length];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setLoopIndex(prev => prev + 1);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, roles]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll to tech section
  const scrollToTech = () => {
    if (techSectionRef.current) {
      techSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Calculate parallax offsets
  const getParallaxOffset = (factor = 1) => {
    if (!isHovering || !sectionRef.current) return { x: 0, y: 0 };
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const offsetX = ((mousePosition.x - centerX) / centerX) * factor;
    const offsetY = ((mousePosition.y - centerY) / centerY) * factor;
    
    return { x: offsetX, y: offsetY };
  };

  const titleOffset = getParallaxOffset(6);
  const roleOffset = getParallaxOffset(4);
  const descriptionOffset = getParallaxOffset(3);
  const tagsOffset = getParallaxOffset(2);
  const buttonsOffset = getParallaxOffset(2.5);
  const terminalOffset = getParallaxOffset(-4);
  const codeLeftOffset = getParallaxOffset(8);
  const codeRightOffset = getParallaxOffset(-8);
  const codeTopLeftOffset = getParallaxOffset(6);
  const codeTopRightOffset = getParallaxOffset(-6);
  const codeBottomLeftOffset = getParallaxOffset(7);
  const codeBottomRightOffset = getParallaxOffset(-7);

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/raslen11', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/raslen11', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com/raslen11', label: 'Twitter' },
  ];

  const techTags = ['React', 'Node.js', 'TypeScript', 'Python', 'Docker', 'AWS', 'GraphQL', 'MongoDB'];

  // Tech Stack Items
  const techStack = [
    { name: 'React', icon: FaReact },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'Python', icon: FaPython },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'GraphQL', icon: SiGraphql },
    { name: 'Docker', icon: FaDocker },
    { name: 'Git', icon: FaGitAlt },
    { name: 'Cloud', icon: FaCloud },
    { name: 'Database', icon: FaDatabase },
    { name: 'Terminal', icon: FaTerminal },
    { name: 'HTML5', icon: FaHtml5 },
    { name: 'CSS3', icon: FaCss3 },
    { name: 'Tailwind', icon: SiTailwindcss },
  ];

  return (
    <section ref={sectionRef} className={`home-section theme-${theme}`}>
      {/* Home Page Mouse Glow */}
      {isHovering && (
        <div 
          className="home-mouse-glow"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}

      {/* Grid Background - Only for Home Page */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* CODE DECORATIONS - Multiple Positions */}

      {/* Top Left - Import Statements */}
      <motion.div 
        className="code-decoration code-top-left"
        animate={{
          x: isHovering ? codeTopLeftOffset.x * 2 : 0,
          y: isHovering ? codeTopLeftOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'import React from "react"'}</span>
        <span className="code-line">{'import { useState } from "react"'}</span>
        <span className="code-line">{'import { motion } from "framer-motion"'}</span>
        <span className="code-line">{'import "./HomePage.css"'}</span>
        <span className="code-line">{''}</span>
        <span className="code-line">{'const HomePage = () => {'}</span>
        <span className="code-line">{'  const [isLoading, setIsLoading]'}</span>
        <span className="code-line">{'  const [data, setData] = useState([])'}</span>
      </motion.div>

      {/* Top Right - useEffect Hook */}
      <motion.div 
        className="code-decoration code-top-right"
        animate={{
          x: isHovering ? codeTopRightOffset.x * 2 : 0,
          y: isHovering ? codeTopRightOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'useEffect(() => {'}</span>
        <span className="code-line">{'  const fetchData = async () => {'}</span>
        <span className="code-line">{'    const response = await fetch'}</span>
        <span className="code-line">{'    ("/api/developer")'}</span>
        <span className="code-line">{'    const data = await response.json()'}</span>
        <span className="code-line">{'    setData(data)'}</span>
        <span className="code-line">{'  }'}</span>
        <span className="code-line">{'  fetchData()'}</span>
        <span className="code-line">{'}, [])'}</span>
      </motion.div>

      {/* Left Side - Main HTML Structure */}
      <motion.div 
        className="code-decoration code-left"
        animate={{
          x: isHovering ? codeLeftOffset.x * 2 : 0,
          y: isHovering ? codeLeftOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'<'}</span>
        <span className="code-line">{'  <div'}</span>
        <span className="code-line">{'    className="developer"'}</span>
        <span className="code-line">{'  >'}</span>
        <span className="code-line">{'    <header>'}</span>
        <span className="code-line">{'      <h1>'}</span>
        <span className="code-line">{'        Hello World'}</span>
        <span className="code-line">{'      </h1>'}</span>
        <span className="code-line">{'    </header>'}</span>
        <span className="code-line">{'    <main>'}</span>
        <span className="code-line">{'      <section'}</span>
        <span className="code-line">{'        className="hero"'}</span>
        <span className="code-line">{'      >'}</span>
      </motion.div>

      {/* Right Side - Closing Tags */}
      <motion.div 
        className="code-decoration code-right"
        animate={{
          x: isHovering ? codeRightOffset.x * 2 : 0,
          y: isHovering ? codeRightOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'      </section>'}</span>
        <span className="code-line">{'    </main>'}</span>
        <span className="code-line">{'    <footer>'}</span>
        <span className="code-line">{'      <p>'}</span>
        <span className="code-line">{'        © 2026 RASLEN11'}</span>
        <span className="code-line">{'      </p>'}</span>
        <span className="code-line">{'    </footer>'}</span>
        <span className="code-line">{'  </div>'}</span>
        <span className="code-line">{'</>'}</span>
      </motion.div>

      {/* Bottom Left - CSS Styles */}
      <motion.div 
        className="code-decoration code-bottom-left"
        animate={{
          x: isHovering ? codeBottomLeftOffset.x * 2 : 0,
          y: isHovering ? codeBottomLeftOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'.developer {'}</span>
        <span className="code-line">{'  display: flex;'}</span>
        <span className="code-line">{'  flex-direction: column;'}</span>
        <span className="code-line">{'  align-items: center;'}</span>
        <span className="code-line">{'  justify-content: center;'}</span>
        <span className="code-line">{'  min-height: 100vh;'}</span>
        <span className="code-line">{'  background: #000;'}</span>
        <span className="code-line">{'  color: #fff;'}</span>
        <span className="code-line">{'}'}</span>
      </motion.div>

      {/* Bottom Right - Export Statement */}
      <motion.div 
        className="code-decoration code-bottom-right"
        animate={{
          x: isHovering ? codeBottomRightOffset.x * 2 : 0,
          y: isHovering ? codeBottomRightOffset.y * 2 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <span className="code-line">{'.hero {'}</span>
        <span className="code-line">{'  animation: fadeIn 1s ease;'}</span>
        <span className="code-line">{'  transform: translateY(0);'}</span>
        <span className="code-line">{'  transition: all 0.3s;'}</span>
        <span className="code-line">{'}'}</span>
        <span className="code-line">{''}</span>
        <span className="code-line">{'export default HomePage'}</span>
      </motion.div>

      <div className="home-container">
        <div className="home-content-wrapper">
          {/* HERO SECTION */}
          <div className="home-hero">
            {/* Left Side - Text Content with Parallax */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: 1, 
                x: isHovering ? titleOffset.x * 0.5 : 0,
                y: isHovering ? titleOffset.y * 0.5 : 0,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1],
                x: { duration: 0.1, ease: "easeOut" },
                y: { duration: 0.1, ease: "easeOut" }
              }}
              className="home-text-content"
            >
              <motion.div 
                className="status-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: isHovering ? titleOffset.x * 0.5 : 0,
                  y: isHovering ? titleOffset.y * 0.5 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <span className="status-dot" />
                <span className="status-text">{translations.status[language]}</span>
              </motion.div>

              <motion.h1 
                className="home-title"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: isHovering ? titleOffset.x * 2 : 0,
                  y: isHovering ? titleOffset.y * 2 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <span className="title-greeting">{translations.title[language]}</span>
                <br />
                <span className="home-name-gradient">{translations.name}</span>
              </motion.h1>

              <motion.div 
                className="home-role"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: isHovering ? roleOffset.x * 1.5 : 0,
                  y: isHovering ? roleOffset.y * 1.5 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <span className="role-prefix">
                  <FaCode className="role-icon" />
                </span>
                <span className="role-text">{displayText}</span>
                <span className={`cursor ${isVisible ? 'visible' : 'hidden'}`}>|</span>
              </motion.div>

              <motion.p 
                className="home-description"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: isHovering ? descriptionOffset.x : 0,
                  y: isHovering ? descriptionOffset.y : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                {translations.description[language]}
              </motion.p>

              <motion.div 
                className="tech-tags"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: isHovering ? tagsOffset.y * 0.5 : 0,
                  x: isHovering ? tagsOffset.x * 0.5 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                {techTags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </motion.div>

              {/* Buttons - Contact Me first, View My Work second */}
              <motion.div 
                className="home-buttons-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: isHovering ? buttonsOffset.y * 0.5 : 0,
                  x: isHovering ? buttonsOffset.x * 0.5 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.1,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                <Link to="/contact" className="home-primary-button">
                  {translations.cta.contact[language]}
                  <FaEnvelope className="button-icon" />
                </Link>
                
                <Link to="/projects" className="home-secondary-button">
                  {translations.cta.viewWork[language]}
                  <FaArrowRight className="button-icon" />
                </Link>
              </motion.div>

              <motion.div 
                className="home-social"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: isHovering ? titleOffset.x * 0.5 : 0,
                  y: isHovering ? titleOffset.y * 0.5 : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.3,
                  x: { duration: 0.1, ease: "easeOut" },
                  y: { duration: 0.1, ease: "easeOut" }
                }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </motion.div>

              {/* SCROLL INDICATOR - Clickable */}
              <motion.div 
                className="scroll-indicator"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6,
                  ease: [0.4, 0, 0.2, 1]
                }}
                onClick={scrollToTech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="scroll-text">{translations.scroll[language]}</span>
                <div className="scroll-arrow-line">
                  <div className="scroll-arrow">
                    <div className="scroll-arrow-line-down" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Terminal with Parallax */}
            <motion.div
              className="home-terminal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: isHovering ? terminalOffset.x * 2 : 0,
                y: isHovering ? terminalOffset.y * 2 : 0,
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6, 
                ease: [0.4, 0, 0.2, 1],
                x: { duration: 0.1, ease: "easeOut" },
                y: { duration: 0.1, ease: "easeOut" }
              }}
            >
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">~/developer/raslen11</span>
                </div>
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">whoami</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-output">RASLEN11</span>
                  </div>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">skills</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-output">Full Stack • React • Node • Python</span>
                  </div>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">experience</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-output">5+ years • 20+ projects</span>
                  </div>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command cursor-blink">_</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TECH STACK SECTION */}
          <div ref={techSectionRef} className="home-tech-section">
            <div className="home-tech-header">
              <motion.div 
                className="home-tech-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="home-tech-badge-icon">⚡</span>
                {translations.tech.badge[language]}
              </motion.div>
              
              <motion.h2 
                className="home-tech-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {translations.tech.title[language]}
              </motion.h2>
              
              <motion.p 
                className="home-tech-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {translations.tech.subtitle[language]}
              </motion.p>
            </div>

            <div className="home-tech-grid">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    className="home-tech-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.05 + (index * 0.04),
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -4,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    <Icon className="home-tech-icon" />
                    <span className="home-tech-name">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;