import React, { useState, useEffect } from 'react';
import './App.css';
import DashboardLayout from './DashboardLayout';

// PUBLIC_INTERFACE
function App() {
  // Optional: support for theme switching, could be integrated with Dash
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ position: "fixed", zIndex: 300, top: 16, right: 16 }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <DashboardLayout />
    </div>
  );
}

export default App;
