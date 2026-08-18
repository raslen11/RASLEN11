// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './Contexts/ThemeContext';
import { LanguageProvider } from './Contexts/LanguageContext';
import GlobalControls from './components/ToggleButtons/ToggleButtons';
import MouseGlow from './Contexts/MouseContext';
import AppContext from './Contexts/AppContext';
import ScrollContext from './Contexts/ScrollContext';
import './styles/globals.css';
import './styles/App.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <MouseGlow />
            <GlobalControls />
            <AppContext />
            <ScrollContext />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;