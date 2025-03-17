
import React, { useState, useEffect } from 'react';
import PomodoroTimer from '@/components/Timer/PomodoroTimer';
import TaskManager from '@/components/Tasks/TaskManager';
import StudyRooms from '@/components/StudyRooms/StudyRooms';
import AnalyticsDashboard from '@/components/Analytics/AnalyticsDashboard';
import DistractionJournal from '@/components/DistractionJournal/DistractionJournal';
import FocusMode from '@/components/FocusMode/FocusMode';
import { toast } from 'sonner';
import Layout from '@/components/Layout/Layout';

const Index = () => {
  const [activeTab, setActiveTab] = useState('timer');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Show welcome toast
    setTimeout(() => {
      toast('Welcome to Focentra', {
        description: 'Stay focused and productive with our Pomodoro timer and task manager.',
        action: {
          label: 'Get Started',
          onClick: () => console.log('User clicked get started')
        }
      });
    }, 1500);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      toast('Focus Mode Activated', {
        description: 'Distractions hidden. Focus on your current task. Press ESC to exit.',
      });
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'timer':
        return <PomodoroTimer />;
      case 'tasks':
        return <TaskManager />;
      case 'rooms':
        return <StudyRooms />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'journal':
        return <DistractionJournal />;
      case 'focus':
        return <FocusMode isFocusMode={isFocusMode} toggleFocusMode={toggleFocusMode} />;
      default:
        return <PomodoroTimer />;
    }
  };
  
  return (
    <Layout>
      {!isFocusMode ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Focentra</h1>
            <p className="text-lg text-gray-600">Stay focused, organized, and productive</p>
          </div>
          
          {isMobile ? (
            <div className="space-y-4">
              <div className="flex overflow-x-auto justify-center mb-4">
                <div className="inline-flex bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-100">
                  {['timer', 'tasks', 'rooms', 'analytics', 'journal', 'focus'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-white text-timerBlue shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="animate-fade-in">
                {renderTabContent()}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <PomodoroTimer />
                <DistractionJournal />
              </div>
              
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <TaskManager />
                <StudyRooms />
              </div>
              
              <div className="col-span-12 space-y-6">
                <AnalyticsDashboard />
                <FocusMode isFocusMode={isFocusMode} toggleFocusMode={toggleFocusMode} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-lg mx-auto">
            <PomodoroTimer />
            
            <div className="text-center mt-8 text-gray-500">
              <p className="mb-2">Focus Mode Active</p>
              <button
                onClick={toggleFocusMode}
                className="text-sm bg-timerOrange/20 text-timerOrange px-4 py-2 rounded-full hover:bg-timerOrange/30 transition-colors"
              >
                Exit Focus Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
