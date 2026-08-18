// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './styles/theme';
import { LanguageProvider } from './styles/LanguageContext';
import GlobalControls from './components/GlobalControls/GlobalControls';
import MouseGlow from './components/MouseGlow/MouseGlow';
import AppRoutes from './AppRoutes';
import './styles/globals.css';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <MouseGlow />
            <GlobalControls />
            <AppRoutes />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;