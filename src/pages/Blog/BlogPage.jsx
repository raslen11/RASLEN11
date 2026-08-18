// src/components/BlogPage.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { blogPosts } from '../../utils/blogData';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = ({ isHomepage = false }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const displayedPosts = isHomepage ? blogPosts.slice(0, 3) : blogPosts;

  const translations = {
    backButton: {
      en: "← Back to Articles",
      fr: "← Retour aux articles"
    },
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
    },
    defaultContent: {
      en: "This is the detailed content for",
      fr: "Voici le contenu détaillé pour"
    }
  };

  useEffect(() => {
    if (id) {
      const post = blogPosts.find(p => p.id === parseInt(id, 10));
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [id]);

  const handleBackToList = () => {
    setSelectedPost(null);
    navigate('/blog');
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }

    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <p key={`para-${index}`}>{item}</p>
      ));
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className={`blog-structured-content theme-${theme}`}>
          {content.heading && <h3>{content.heading}</h3>}
          {content.paragraphs?.map((para, index) => (
            <p key={`p-${index}`}>{para}</p>
          ))}
          {content.image && (
            <div className="blog-content-image-container">
              <img
                src={content.image}
                alt={content.caption || 'Blog content illustration'}
              />
              {content.caption && (
                <p className="image-caption">{content.caption}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  if (selectedPost) {
    return (
      <section
        className={`blog-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${isHomepage ? 'blog-section-home' : ''}`}
        id="blog"
      >
        <div className="blog-container">
          <motion.button
            onClick={handleBackToList}
            className="blog-back-button"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations.backButton[language]}
          </motion.button>

          <article className="blog-detail-article">
            <header className="blog-detail-header">
              <span className="blog-category">{selectedPost.category[language]}</span>
              <h1 className="blog-post-title">{selectedPost.title[language]}</h1>
              <div className="blog-card-footer">
                <span className="blog-date">{selectedPost.date}</span>
              </div>
              {selectedPost.image && (
                <div className="blog-card-image-container">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title[language] || 'Blog post'}
                    className="blog-card-image"
                  />
                </div>
              )}
            </header>

            <div className="blog-excerpt">
              {selectedPost.content?.[language]
                ? selectedPost.content[language].map((block, i) => (
                    <div key={i}>{renderContent(block)}</div>
                  ))
                : <p>{translations.defaultContent[language]} {selectedPost.title[language]}</p>
              }
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`blog-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${isHomepage ? 'blog-section-home' : ''}`}
      id="blog"
    >
      <div className="blog-container">
        {!isHomepage && (
          <motion.h2
            className="blog-title"
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
            <span className="blog-title-highlight">
              {translations.highlight[language]}
            </span>
          </motion.h2>
        )}

        <div className={`blog-grid ${isHomepage ? 'blog-grid-home' : 'blog-grid-full'}`}>
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 12
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="blog-card-wrapper"
            >
              <div
                className="blog-card"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {post.image && (
                  <div className="blog-card-image-container">
                    <img
                      src={post.image}
                      alt={post.title[language] || 'Blog article'}
                      className="blog-card-image"
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
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {translations.readMore[language]}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {isHomepage && blogPosts.length > 3 && (
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
            className="blog-view-all"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="blog-view-all-button"
                onClick={() => navigate('/blog')}
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

export default BlogPage;