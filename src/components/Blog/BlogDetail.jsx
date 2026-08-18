import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../Contexts/ThemeContext';
import { useLanguage } from '../../Contexts/LanguageContext';
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
      <section className={`blog-detail-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <div className="grid-background" />
        <div className="grid-glow" />
        <div className="bd-wrapper">
          <div className="bd-not-found">
            <h2>{language === 'fr' ? 'Article non trouvé' : 'Post not found'}</h2>
            <p>{language === 'fr' ? "L'article que vous recherchez n'existe pas." : "The post you're looking for doesn't exist."}</p>
          </div>
        </div>
      </section>
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
          className="bd-content-block"
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
            <div className="bd-content-image">
              <img 
                src={content.image} 
                alt={content.caption?.[language] || post.title[language]} 
              />
              {content.caption && (
                <p className="bd-image-caption">{content.caption[language]}</p>
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
      {/* Grid Background */}
      <div className="grid-background" />
      <div className="grid-glow" />

      {/* Code Decorations */}
      <div className="bd-code-decoration bd-code-top-left">
        <span className="bd-code-line">const blog = {'{'}</span>
        <span className="bd-code-line">  posts: [...]</span>
        <span className="bd-code-line">  author: "..."</span>
        <span className="bd-code-line">  tags: [...]</span>
        <span className="bd-code-line">{'}'}</span>
      </div>

      <div className="bd-code-decoration bd-code-top-right">
        <span className="bd-code-line">function render() {'{'}</span>
        <span className="bd-code-line">  return (</span>
        <span className="bd-code-line">    &lt;Article /&gt;</span>
        <span className="bd-code-line">  )</span>
        <span className="bd-code-line">{'}'}</span>
      </div>

      <div className="bd-code-decoration bd-code-left">
        <span className="bd-code-line">'// Blog Detail'</span>
        <span className="bd-code-line">'// Loading state...'</span>
        <span className="bd-code-line">const [data, setData] =</span>
        <span className="bd-code-line">  useState(null)</span>
      </div>

      <div className="bd-code-decoration bd-code-right">
        <span className="bd-code-line">useEffect(() = {'{'}</span>
        <span className="bd-code-line">  fetchPost(id)</span>
        <span className="bd-code-line">    .then(setData)</span>
        <span className="bd-code-line">    .catch(handleError)</span>
        <span className="bd-code-line">{'}'}, [id])</span>
      </div>

      <div className="bd-code-decoration bd-code-bottom-left">
        <span className="bd-code-line">'/* Styles */'</span>
        <span className="bd-code-line">.blog-detail {'{'}</span>
        <span className="bd-code-line">  padding: 2rem;</span>
        <span className="bd-code-line">  max-width: 900px;</span>
        <span className="bd-code-line">  margin: 0 auto;</span>
        <span className="bd-code-line">{'}'}</span>
      </div>

      <div className="bd-code-decoration bd-code-bottom-right">
        <span className="bd-code-line">export default</span>
        <span className="bd-code-line">  BlogDetail</span>
      </div>

      <div className="bd-wrapper">
        {/* Back Button */}
        <motion.button 
          className="bd-back-button" 
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
          className="bd-article"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="bd-header">
            <motion.span 
              className="bd-category"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {post.category[language]}
            </motion.span>
            <motion.h1 
              className="bd-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {post.title[language]}
            </motion.h1>
            <motion.div 
              className="bd-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="bd-date">{post.date}</span>
            </motion.div>
          </header>

          {post.image && (
            <motion.div 
              className="bd-image-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <img 
                src={post.image} 
                alt={post.title[language]} 
                className="bd-image" 
              />
            </motion.div>
          )}

          <div className="bd-content">
            {post.content.map((block, index) => renderContent(block, index))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogDetail;