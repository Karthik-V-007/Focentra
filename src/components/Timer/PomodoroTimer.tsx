
import React, { useState, useEffect, useRef } from 'react';
import { TimerMode, TimerSettings } from '@/types/types';
import { Play, Pause, SkipForward, RotateCcw, Settings } from 'lucide-react';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  breakDuration: 5,
  sessionsGoal: 4
};

const PomodoroTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/bell.mp3');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    setTimeLeft(mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60);
  }, [mode, settings]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const handleTimerComplete = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (mode === 'work') {
      setSessionsCompleted(prev => prev + 1);
      setMode('break');
      setTimeLeft(settings.breakDuration * 60);
    } else {
      setMode('work');
      setTimeLeft(settings.workDuration * 60);
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60);
  };

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    
    if (mode === 'work') {
      setSessionsCompleted(prev => prev + 1);
      setMode('break');
      setTimeLeft(settings.breakDuration * 60);
    } else {
      setMode('work');
      setTimeLeft(settings.workDuration * 60);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalSeconds = mode === 'work' 
      ? settings.workDuration * 60 
      : settings.breakDuration * 60;
    return (1 - timeLeft / totalSeconds) * 100;
  };

  const circumference = 2 * Math.PI * 120; // Circle radius is 120
  const strokeDashoffset = circumference - (calculateProgress() / 100) * circumference;

  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 glass-card animate-fade-in">
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          mode === 'work' ? 'bg-timerBlue/20 text-timerBlue' : 'bg-timerGreen/20 text-timerGreen'
        }`}>
          {mode === 'work' ? 'Focus Session' : 'Break Time'}
        </span>
      </div>
      
      <div className="relative w-72 h-72 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 264 264">
          <circle 
            cx="132" 
            cy="132" 
            r="120" 
            stroke="#E2E8F0" 
            strokeWidth="8" 
            fill="none" 
          />
          <circle 
            cx="132" 
            cy="132" 
            r="120" 
            stroke={mode === 'work' ? '#6C9BCF' : '#88C9A1'} 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-5xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <div className="text-gray-500 text-sm">{mode === 'work' ? 'Stay focused' : 'Take a breather'}</div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-3 mb-6">
        <button 
          onClick={handleReset}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          aria-label="Reset timer"
        >
          <RotateCcw size={20} className="text-gray-600" />
        </button>
        <button 
          onClick={handleStartPause}
          className={`p-5 rounded-full transition-colors duration-300 ${
            isActive 
              ? 'bg-timerOrange hover:bg-timerOrange/90' 
              : mode === 'work' ? 'bg-timerBlue hover:bg-timerBlue/90' : 'bg-timerGreen hover:bg-timerGreen/90'
          }`}
          aria-label={isActive ? "Pause timer" : "Start timer"}
        >
          {isActive ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
        </button>
        <button 
          onClick={handleSkip}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          aria-label="Skip to next session"
        >
          <SkipForward size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-600 mb-4">
        <span className="font-medium">{sessionsCompleted}/{settings.sessionsGoal} Sessions Completed</span>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <Settings size={14} className="mr-1" />
          Timer Settings
        </button>
      </div>
      
      {showSettings && (
        <div className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 animate-scale-in">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.workDuration}
              onChange={(e) => setSettings({...settings, workDuration: parseInt(e.target.value) || 25})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-timerBlue focus:ring focus:ring-timerBlue/20 px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Break Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.breakDuration}
              onChange={(e) => setSettings({...settings, breakDuration: parseInt(e.target.value) || 5})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-timerBlue focus:ring focus:ring-timerBlue/20 px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sessions Goal</label>
            <input
              type="number"
              min="1"
              max="12"
              value={settings.sessionsGoal}
              onChange={(e) => setSettings({...settings, sessionsGoal: parseInt(e.target.value) || 4})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-timerBlue focus:ring focus:ring-timerBlue/20 px-3 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
