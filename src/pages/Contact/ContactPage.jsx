// src/pages/Contact/ContactPage.jsx
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import emailjs from '@emailjs/browser';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaPaperPlane,
  FaMapMarkerAlt,
  FaUser,
  FaComment
} from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const translations = {
    badge: {
      en: 'Get in Touch',
      fr: 'Contactez-moi'
    },
    title: {
      en: "Let's Connect",
      fr: "Connectons-nous"
    },
    subtitle: {
      en: "Whether you want to discuss a potential project, collaborate on open-source software, or simply chat about new technologies, feel free to reach out.",
      fr: "Que vous souhaitiez discuter d'un projet potentiel, collaborer sur un logiciel open-source, ou simplement parler des nouvelles technologies, n'hésitez pas à me contacter."
    },
    formTitle: {
      en: "Send a Message",
      fr: "Envoyer un Message"
    },
    contactInfo: {
      en: "Contact Information",
      fr: "Informations de Contact"
    },
    methods: {
      email: {
        en: "Email",
        fr: "Email"
      },
      phone: {
        en: "Phone",
        fr: "Téléphone"
      },
      location: {
        en: "Location",
        fr: "Localisation"
      }
    },
    methodValues: {
      email: "rkalboussi15@gmail.com",
      phone: "+216 99 999 999",
      location: {
        en: "Tunisia",
        fr: "Tunisie"
      }
    },
    formLabels: {
      name: {
        en: "Full Name",
        fr: "Nom Complet"
      },
      email: {
        en: "Email Address",
        fr: "Adresse Email"
      },
      message: {
        en: "Your Message",
        fr: "Votre Message"
      }
    },
    placeholders: {
      name: {
        en: "Enter your full name",
        fr: "Entrez votre nom complet"
      },
      email: {
        en: "Enter your email address",
        fr: "Entrez votre adresse email"
      },
      message: {
        en: "Tell me about your project...",
        fr: "Parlez-moi de votre projet..."
      }
    },
    submitButton: {
      sending: {
        en: "Sending...",
        fr: "Envoi en cours..."
      },
      default: {
        en: "Send Message",
        fr: "Envoyer le Message"
      }
    },
    messages: {
      success: {
        en: "Message sent successfully! I'll get back to you soon.",
        fr: "Message envoyé avec succès ! Je vous répondrai bientôt."
      },
      error: {
        en: "Failed to send message. Please try again.",
        fr: "Échec de l'envoi du message. Veuillez réessayer."
      }
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: translations.methods.email[language],
      value: translations.methodValues.email,
      link: "mailto:rkalboussi15@gmail.com",
      ariaLabel: "Send email to rkalboussi15@gmail.com"
    },
    {
      icon: <FaGithub />,
      title: "GitHub",
      value: "github.com/raslen11",
      link: "https://github.com/raslen11",
      ariaLabel: "Visit GitHub profile"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      value: "linkedin.com/in/raslen11",
      link: "https://www.linkedin.com/in/raslen11",
      ariaLabel: "Visit LinkedIn profile"
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      value: "@raslen11",
      link: "https://twitter.com/raslen11",
      ariaLabel: "Visit Twitter profile"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: translations.methods.location[language],
      value: translations.methodValues.location[language],
      link: "#",
      ariaLabel: "Location"
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_xxxxxxx',
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx',
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxx'
    )
    .then(() => {
      setMessage({ 
        text: translations.messages.success[language], 
        type: 'success' 
      });
      form.current.reset();
    })
    .catch(() => {
      setMessage({ 
        text: translations.messages.error[language], 
        type: 'error' 
      });
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className={`contact-section theme-${theme}`}>
      {/* Code Decorations */}
      <div className="contact-code-decoration contact-code-left">
        <span className="contact-code-line">{'<'}</span>
        <span className="contact-code-line">{'  <section'}</span>
        <span className="contact-code-line">{'    id="contact"'}</span>
        <span className="contact-code-line">{'  >'}</span>
      </div>
      <div className="contact-code-decoration contact-code-right">
        <span className="contact-code-line">{'  </section>'}</span>
        <span className="contact-code-line">{'</>'}</span>
      </div>

      <div className="contact-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="contact-content"
        >
          {/* Header */}
          <div className="contact-header">
            <motion.div variants={itemVariants} className="contact-badge">
              <span className="contact-badge-icon">✦</span>
              {translations.badge[language]}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="contact-title">
              {translations.title[language]}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="contact-subtitle">
              {translations.subtitle[language]}
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="contact-grid">
            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="contact-methods-section">
              <h2 className="contact-section-title">
                <FaUser className="contact-section-icon" />
                {translations.contactInfo[language]}
              </h2>
              
              <div className="contact-methods-grid">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-method-card"
                    aria-label={method.ariaLabel || method.title}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="contact-method-icon">
                      {method.icon}
                    </div>
                    <div className="contact-method-info">
                      <span className="contact-method-title">{method.title}</span>
                      <span className="contact-method-value">{method.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="contact-form-section">
              <h2 className="contact-section-title">
                <FaComment className="contact-section-icon" />
                {translations.formTitle[language]}
              </h2>
              
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`contact-message ${message.type}`}
                  >
                    {message.text}
                  </motion.div>
                )}
                
                <div className="form-group">
                  <label className="form-label">
                    {translations.formLabels.name[language]}
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="form-input"
                    placeholder={translations.placeholders.name[language]}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    {translations.formLabels.email[language]}
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="form-input"
                    placeholder={translations.placeholders.email[language]}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    {translations.formLabels.message[language]}
                  </label>
                  <textarea
                    name="message"
                    required
                    className="form-textarea"
                    placeholder={translations.placeholders.message[language]}
                    rows="4"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      {translations.submitButton.sending[language]}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="submit-icon" />
                      {translations.submitButton.default[language]}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;