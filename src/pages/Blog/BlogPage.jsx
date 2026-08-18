import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { blogPosts } from '../../utils/blogData';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = ({ isHomepage = false }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const displayedPosts = isHomepage ? blogPosts.slice(0, 3) : blogPosts;

  const translations = {
    title: {
      en: "Latest ",
      fr: "Derniers "
    },
    highlight: {
      en: "Articles",
      fr: "Articles"
    },
    readMore: {
      en: "Read more →",
      fr: "Lire plus →"
    },
    viewAll: {
      en: "View All Articles",
      fr: "Voir tous les articles"
    }
  };

  return (
    <section className={`blog-section theme-${theme}`}>
      {/* Grid Background */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* Code Decorations */}
      <div className="blog-code-decoration blog-code-top-left">
        <span className="blog-code-line">{'import React from "react"'}</span>
        <span className="blog-code-line">{'import { useState } from "react"'}</span>
        <span className="blog-code-line">{'import { motion } from "framer-motion"'}</span>
        <span className="blog-code-line">{'import { blogPosts } from "./data"'}</span>
        <span className="blog-code-line">{''}</span>
        <span className="blog-code-line">{'const BlogPage = () => {'}</span>
        <span className="blog-code-line">{'  const [posts, setPosts] = useState([])'}</span>
      </div>

      <div className="blog-code-decoration blog-code-top-right">
        <span className="blog-code-line">{'useEffect(() => {'}</span>
        <span className="blog-code-line">{'  const fetchPosts = async () => {'}</span>
        <span className="blog-code-line">{'    const res = await fetch("/api/posts")'}</span>
        <span className="blog-code-line">{'    const data = await res.json()'}</span>
        <span className="blog-code-line">{'    setPosts(data)'}</span>
        <span className="blog-code-line">{'  }'}</span>
        <span className="blog-code-line">{'  fetchPosts()'}</span>
        <span className="blog-code-line">{'}, [])'}</span>
      </div>

      <div className="blog-code-decoration blog-code-left">
        <span className="blog-code-line">{'<'}</span>
        <span className="blog-code-line">{'  <div'}</span>
        <span className="blog-code-line">{'    className="blog"'}</span>
        <span className="blog-code-line">{'  >'}</span>
        <span className="blog-code-line">{'    <header>'}</span>
        <span className="blog-code-line">{'      <h1>'}</span>
        <span className="blog-code-line">{'        My Blog'}</span>
        <span className="blog-code-line">{'      </h1>'}</span>
        <span className="blog-code-line">{'    </header>'}</span>
        <span className="blog-code-line">{'    <main>'}</span>
        <span className="blog-code-line">{'      <section'}</span>
        <span className="blog-code-line">{'        className="blog-grid"'}</span>
        <span className="blog-code-line">{'      >'}</span>
      </div>

      <div className="blog-code-decoration blog-code-right">
        <span className="blog-code-line">{'      </section>'}</span>
        <span className="blog-code-line">{'    </main>'}</span>
        <span className="blog-code-line">{'    <footer>'}</span>
        <span className="blog-code-line">{'      <p>'}</span>
        <span className="blog-code-line">{'        © 2026 RASLEN11'}</span>
        <span className="blog-code-line">{'      </p>'}</span>
        <span className="blog-code-line">{'    </footer>'}</span>
        <span className="blog-code-line">{'  </div>'}</span>
        <span className="blog-code-line">{'</>'}</span>
      </div>

      <div className="blog-code-decoration blog-code-bottom-left">
        <span className="blog-code-line">{'.blog {'}</span>
        <span className="blog-code-line">{'  display: grid;'}</span>
        <span className="blog-code-line">{'  grid-template-columns: repeat(3, 1fr);'}</span>
        <span className="blog-code-line">{'  gap: 2rem;'}</span>
        <span className="blog-code-line">{'  padding: 2rem;'}</span>
        <span className="blog-code-line">{'  background: #000;'}</span>
        <span className="blog-code-line">{'  color: #fff;'}</span>
        <span className="blog-code-line">{'}'}</span>
      </div>

      <div className="blog-code-decoration blog-code-bottom-right">
        <span className="blog-code-line">{'.blog-card {'}</span>
        <span className="blog-code-line">{'  border-radius: 16px;'}</span>
        <span className="blog-code-line">{'  overflow: hidden;'}</span>
        <span className="blog-code-line">{'  transition: all 0.3s;'}</span>
        <span className="blog-code-line">{'}'}</span>
        <span className="blog-code-line">{''}</span>
        <span className="blog-code-line">{'export default BlogPage'}</span>
      </div>

      <div className="blog-container">
        {!isHomepage && (
          <motion.h2
            className="blog-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {translations.title[language]}
            <span className="blog-title-highlight">
              {translations.highlight[language]}
            </span>
          </motion.h2>
        )}

        <div className={`blog-grid ${isHomepage ? 'blog-grid-home' : 'blog-grid-full'}`}>
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
              viewport={{ once: true }}
              className="blog-card-wrapper"
            >
              <div
                className="blog-card"
                onClick={() => navigate(`/blog/${post.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/blog/${post.id}`);
                  }
                }}
              >
                {post.image && (
                  <div className="blog-card-image-container">
                    <img
                      src={post.image}
                      alt={post.title[language] || 'Blog article'}
                      className="blog-card-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-header">
                    <span className="blog-category">{post.category[language]}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3 className="blog-post-title">{post.title[language]}</h3>
                  <p className="blog-excerpt">
                    {post.subtitle?.[language] || ''}
                  </p>
                  <div className="blog-card-footer">
                    <motion.button
                      className="blog-read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${post.id}`);
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {translations.readMore[language]}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isHomepage && blogPosts.length > 3 && (
          <motion.div
            className="blog-view-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="blog-view-all-button"
              onClick={() => navigate('/blog')}
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

export default BlogPage;