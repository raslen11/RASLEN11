// src/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import ProjectsPage from '../pages/Project/ProjectsPage';
import ProjectDetail from '../components/Projects/ProjectDetail';
import BlogPage from '../pages/Blog/BlogPage';
import BlogDetail from '../components/Blog/BlogDetail';
import ContactPage from '../pages/Contact/ContactPage';
import Error from '../pages/Error/ErrorPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MouseGlow from './MouseContext';

const AppRoutes = () => {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <MouseGlow />
      <Header />
      <main className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Error />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes;