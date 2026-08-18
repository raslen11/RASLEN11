import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import { blogPosts } from '../../utils/blogData';
import './BlogDetail.css';

const BlogDetail = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id, 10));

  if (!post) {
    return (
      <div className={`blog-not-found ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        {language === 'fr' ? 'Article non trouvé' : 'Post not found'}
      </div>
    );
  }

  const translations = {
    backButton: {
      en: "← Back to Blog",
      fr: "← Retour au blog"
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
      return (
        <motion.div 
          className="blog-content-block"
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
          {content.image && (
            <div className="blog-content-image">
              <img 
                src={content.image} 
                alt={content.caption?.[language] || post.title[language]} 
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

  return (
    <section className={`blog-detail-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="blog-detail-container">
        {/* Back Button */}
        <motion.button 
          className="blog-back-button" 
          onClick={() => navigate('/blog')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          {translations.backButton[language]}
        </motion.button>

        <motion.article 
          className="blog-detail-article"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="blog-detail-header">
            <motion.span 
              className="blog-detail-category"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {post.category[language]}
            </motion.span>
            <motion.h1 
              className="blog-detail-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {post.title[language]}
            </motion.h1>
            <motion.div 
              className="blog-detail-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="blog-detail-date">{post.date}</span>
            </motion.div>
            {post.image && (
              <motion.div 
                className="blog-detail-image-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <img 
                  src={post.image} 
                  alt={post.title[language]} 
                  className="blog-detail-image" 
                />
              </motion.div>
            )}
          </header>

          <div className="blog-detail-content">
            {post.content.map((block, index) => renderContent(block, index))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogDetail;