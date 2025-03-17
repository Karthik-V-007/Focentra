
import React from 'react';
import { Timer, CheckSquare, Users, BarChart, BookText, EyeOff, Moon, Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen,
  toggleSidebar,
  isDarkMode,
  toggleDarkMode
}) => {
  const tabs = [
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'rooms', label: 'Study Rooms', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'journal', label: 'Journal', icon: BookText },
    { id: 'focus', label: 'Focus Mode', icon: EyeOff },
  ];
  
  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-2 p-2 rounded-md text-gray-500 lg:hidden hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="h-8 w-8 rounded-md bg-timerBlue flex items-center justify-center mr-2">
                <Timer size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">TimerTribe</span>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'text-timerBlue bg-timerBlue/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} className="mr-1.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 flex flex-col items-center text-xs font-medium ${
                  activeTab === tab.id
                    ? 'text-timerBlue border-t-2 border-timerBlue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={20} className="mb-1" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
