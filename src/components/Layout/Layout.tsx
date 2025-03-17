
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('timer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(localStorage.getItem('darkMode') === 'true' || prefersDark);
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
      
      if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        setIsFocusMode(!isFocusMode);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFocusMode]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${isFocusMode ? 'focus-mode' : ''}`}>
      {!isFocusMode && (
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      
      {isFocusMode && (
        <button
          onClick={toggleFocusMode}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-timerOrange text-white shadow-lg hover:bg-timerOrange/90 transition-colors z-50"
        >
          Exit Focus Mode
        </button>
      )}
    </div>
  );
};

export default Layout;
