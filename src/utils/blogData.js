// src/utils/blogData.js
export const blogPosts = [
  {
    id: 1,
    title: {
      en: 'Mastering React Hooks in Modern Applications',
      fr: 'Maîtriser les Hooks React dans les applications modernes'
    },
    subtitle: {
      en: 'A comprehensive guide to state management in functional components',
      fr: 'Un guide complet sur la gestion d\'état dans les composants fonctionnels'
    },
    category: {
      en: 'React',
      fr: 'React'
    },
    date: 'June 10, 2023',
    tags: ['react', 'hooks', 'frontend'],
    featured: true,
    content: [
      {
        heading: {
          en: 'Introduction to React Hooks',
          fr: 'Introduction aux Hooks React'
        },
        paragraphs: {
          en: [
            'React Hooks were introduced in React 16.8 and have since revolutionized how we write React components.',
            'They allow you to use state and other React features without writing classes, making your code more concise and easier to understand.'
          ],
          fr: [
            'Les Hooks React ont été introduits dans React 16.8 et ont révolutionné la façon dont nous écrivons les composants React.',
            'Ils permettent d\'utiliser l\'état et d\'autres fonctionnalités de React sans écrire de classes, rendant votre code plus concis et plus facile à comprendre.'
          ]
        },
        code: `import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
        image: '/images/react-hooks.jpg',
        caption: {
          en: 'React Hooks lifecycle diagram',
          fr: 'Diagramme du cycle de vie des Hooks React'
        }
      },
      {
        heading: {
          en: 'Common Hooks Explained',
          fr: 'Explication des Hooks courants'
        },
        paragraphs: {
          en: [
            'The most commonly used hooks are useState, useEffect, and useContext.',
            'Each serves a specific purpose in managing component state and side effects.'
          ],
          fr: [
            'Les hooks les plus couramment utilisés sont useState, useEffect et useContext.',
            'Chacun a un objectif spécifique dans la gestion de l\'état des composants et des effets secondaires.'
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: {
      en: 'Building Scalable Node.js Backends',
      fr: 'Construire des backends Node.js évolutifs'
    },
    subtitle: {
      en: 'Best practices for enterprise-grade applications',
      fr: 'Meilleures pratiques pour les applications de niveau entreprise'
    },
    category: {
      en: 'Node.js',
      fr: 'Node.js'
    },
    date: 'July 5, 2023',
    tags: ['node', 'backend', 'scalability'],
    featured: true,
    content: [
      {
        heading: {
          en: 'Architecture Patterns',
          fr: 'Modèles d\'architecture'
        },
        paragraphs: {
          en: [
            'Building scalable Node.js applications requires careful planning of your architecture.',
            'Common patterns include microservices, layered architecture, and event-driven architecture.'
          ],
          fr: [
            'La construction d\'applications Node.js évolutives nécessite une planification minutieuse de votre architecture.',
            'Les modèles courants incluent les microservices, l\'architecture en couches et l\'architecture orientée événements.'
          ]
        },
        image: '/images/node-architecture.jpg',
        caption: {
          en: 'Node.js architecture patterns comparison',
          fr: 'Comparaison des modèles d\'architecture Node.js'
        }
      }
    ]
  },
  {
    id: 3,
    title: {
      en: 'CSS Grid vs Flexbox: When to Use Each',
      fr: 'CSS Grid vs Flexbox : Quand utiliser chacun'
    },
    subtitle: {
      en: 'A practical guide to modern CSS layout techniques',
      fr: 'Un guide pratique des techniques modernes de mise en page CSS'
    },
    category: {
      en: 'CSS',
      fr: 'CSS'
    },
    date: 'August 15, 2023',
    tags: ['css', 'frontend', 'layout'],
    content: [
      {
        heading: {
          en: 'Understanding the Differences',
          fr: 'Comprendre les différences'
        },
        paragraphs: {
          en: [
            'CSS Grid is a two-dimensional layout system, while Flexbox is designed for one-dimensional layouts.',
            'Grid is best for overall page structure, while Flexbox excels at aligning content within smaller components.'
          ],
          fr: [
            'CSS Grid est un système de mise en page bidimensionnel, tandis que Flexbox est conçu pour des mises en page unidimensionnelles.',
            'Grid est idéal pour la structure globale de la page, tandis que Flexbox excelle dans l\'alignement du contenu au sein de petits composants.'
          ]
        },
        code: `/* Grid Example */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}

/* Flexbox Example */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
        image: '/images/grid-vs-flex.jpg',
        caption: {
          en: 'Visual comparison of Grid and Flexbox',
          fr: 'Comparaison visuelle entre Grid et Flexbox'
        }
      }
    ]
  },
  {
    id: 4,
    title: {
      en: 'TypeScript for React Developers',
      fr: 'TypeScript pour les développeurs React'
    },
    subtitle: {
      en: 'Enhancing your React applications with type safety',
      fr: 'Améliorer vos applications React avec la sécurité des types'
    },
    category: {
      en: 'TypeScript',
      fr: 'TypeScript'
    },
    date: 'September 2, 2023',
    tags: ['typescript', 'react', 'frontend'],
    featured: true,
    content: [
      {
        heading: {
          en: 'Why TypeScript with React?',
          fr: 'Pourquoi utiliser TypeScript avec React ?'
        },
        paragraphs: {
          en: [
            'TypeScript helps catch errors during development rather than at runtime.',
            'It provides better IDE support and makes your code more maintainable as your application grows.'
          ],
          fr: [
            'TypeScript aide à détecter les erreurs pendant le développement plutôt qu\'à l\'exécution.',
            'Il offre un meilleur support IDE et rend votre code plus maintenable à mesure que votre application grandit.'
          ]
        },
        code: `interface UserProps {
  name: string;
  age: number;
  isAdmin?: boolean;
}

const UserProfile: React.FC<UserProps> = ({ name, age, isAdmin = false }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <p>Admin User</p>}
    </div>
  );
};`
      }
    ]
  },
  {
    id: 5,
    title: {
      en: 'Authentication Best Practices in 2023',
      fr: 'Meilleures pratiques d\'authentification en 2023'
    },
    subtitle: {
      en: 'Securing your applications with modern techniques',
      fr: 'Sécuriser vos applications avec des techniques modernes'
    },
    category: {
      en: 'Security',
      fr: 'Sécurité'
    },
    date: 'October 18, 2023',
    tags: ['authentication', 'security', 'backend'],
    content: [
      {
        heading: {
          en: 'JWT vs Session Cookies',
          fr: 'JWT vs Cookies de session'
        },
        paragraphs: {
          en: [
            'Both JWT and session cookies have their place in modern authentication.',
            'JWTs are great for stateless APIs, while session cookies provide better security for traditional web apps.'
          ],
          fr: [
            'JWT et les cookies de session ont tous deux leur place dans l\'authentification moderne.',
            'Les JWT sont excellents pour les API sans état, tandis que les cookies de session offrent une meilleure sécurité pour les applications web traditionnelles.'
          ]
        },
        image: '/images/auth-methods.jpg',
        caption: {
          en: 'Authentication methods comparison',
          fr: 'Comparaison des méthodes d\'authentification'
        }
      }
    ]
  },
  {
    id: 6,
    title: {
      en: 'Optimizing Web Performance',
      fr: 'Optimiser les performances web'
    },
    subtitle: {
      en: 'Techniques to make your website blazing fast',
      fr: 'Techniques pour rendre votre site extrêmement rapide'
    },
    category: {
      en: 'Performance',
      fr: 'Performance'
    },
    date: 'November 5, 2023',
    tags: ['performance', 'frontend', 'optimization'],
    content: [
      {
        heading: {
          en: 'Critical Rendering Path',
          fr: 'Chemin de rendu critique'
        },
        paragraphs: {
          en: [
            'Understanding the critical rendering path is essential for performance optimization.',
            'Focus on minimizing render-blocking resources and optimizing asset delivery.'
          ],
          fr: [
            'Comprendre le chemin de rendu critique est essentiel pour l\'optimisation des performances.',
            'Concentrez-vous sur la minimisation des ressources bloquant le rendu et l\'optimisation de la livraison des assets.'
          ]
        },
        code: `<!-- Defer non-critical JavaScript -->
<script src="script.js" defer></script>

<!-- Preload important resources -->
<link rel="preload" href="styles.css" as="style">`
      }
    ]
  },
  {
    id: 7,
    title: {
      en: 'Getting Started with GraphQL',
      fr: 'Commencer avec GraphQL'
    },
    subtitle: {
      en: 'A modern approach to API design',
      fr: 'Une approche moderne de la conception d\'API'
    },
    category: {
      en: 'GraphQL',
      fr: 'GraphQL'
    },
    date: 'December 12, 2023',
    tags: ['graphql', 'api', 'backend'],
    content: [
      {
        heading: {
          en: 'GraphQL vs REST',
          fr: 'GraphQL vs REST'
        },
        paragraphs: {
          en: [
            'GraphQL provides more flexibility than REST by allowing clients to request exactly what they need.',
            'It solves common problems like over-fetching and under-fetching of data.'
          ],
          fr: [
            'GraphQL offre plus de flexibilité que REST en permettant aux clients de demander exactement ce dont ils ont besoin.',
            'Il résout des problèmes courants comme la récupération excessive ou insuffisante de données.'
          ]
        },
        code: `query {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}`
      }
    ]
  },
  {
    id: 8,
    title: {
      en: 'State Management in 2023',
      fr: 'Gestion d\'état en 2023'
    },
    subtitle: {
      en: 'Comparing Redux, Context API, and modern alternatives',
      fr: 'Comparaison de Redux, Context API et des alternatives modernes'
    },
    category: {
      en: 'React',
      fr: 'React'
    },
    date: 'January 20, 2024',
    tags: ['react', 'state-management', 'frontend'],
    featured: true,
    content: [
      {
        heading: {
          en: 'The State Management Landscape',
          fr: 'Le paysage de la gestion d\'état'
        },
        paragraphs: {
          en: [
            'The React ecosystem offers multiple solutions for state management.',
            'Redux is still popular but newer solutions like Zustand and Jotai offer simpler alternatives.'
          ],
          fr: [
            'L\'écosystème React offre plusieurs solutions pour la gestion d\'état.',
            'Redux est toujours populaire mais des solutions plus récentes comme Zustand et Jotai offrent des alternatives plus simples.'
          ]
        },
        image: '/images/state-management.jpg',
        caption: {
          en: 'State management libraries comparison',
          fr: 'Comparaison des bibliothèques de gestion d\'état'
        }
      }
    ]
  }
];