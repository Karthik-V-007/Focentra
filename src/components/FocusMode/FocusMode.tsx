
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, ArrowLeftRight } from 'lucide-react';
import { AmbientSound } from '@/types/types';

const ambientSounds: AmbientSound[] = [
  { id: 'rain', name: 'Rain', file: '/sounds/rain.mp3' },
  { id: 'library', name: 'Library', file: '/sounds/library.mp3' },
  { id: 'cafe', name: 'Coffee Shop', file: '/sounds/cafe.mp3' }
];

interface FocusModeProps {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusMode: React.FC<FocusModeProps> = ({ isFocusMode, toggleFocusMode }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (activeSound) {
      const soundObj = ambientSounds.find(s => s.id === activeSound);
      if (soundObj && !audioRef.current) {
        audioRef.current = new Audio(soundObj.file);
        audioRef.current.loop = true;
      }
      
      if (audioRef.current) {
        audioRef.current.volume = muted ? 0 : volume / 100;
        audioRef.current.play().catch(e => console.error("Error playing sound:", e));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [activeSound, volume, muted]);
  
  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveSound(soundId);
    }
  };
  
  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.volume = !muted ? 0 : volume / 100;
    }
  };
  
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && !muted) {
      audioRef.current.volume = newVolume / 100;
    }
    if (muted && newVolume > 0) {
      setMuted(false);
    }
  };
  
  return (
    <div className="glass-card p-5 animate-fade-in w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Focus Mode</h2>
        <button
          onClick={toggleFocusMode}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            isFocusMode 
              ? 'bg-timerOrange text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isFocusMode ? (
            <>
              <Eye size={16} className="mr-1.5" />
              Exit Focus Mode
            </>
          ) : (
            <>
              <EyeOff size={16} className="mr-1.5" />
              Enter Focus Mode
            </>
          )}
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">
          Focus mode hides distracting elements and helps you concentrate on your current task.
        </p>
        <div className={`p-3 rounded-lg ${isFocusMode ? 'bg-timerOrange/10 border border-timerOrange/30' : 'bg-gray-100'}`}>
          <div className="flex items-center">
            {isFocusMode ? (
              <EyeOff size={18} className="text-timerOrange mr-2" />
            ) : (
              <Eye size={18} className="text-gray-500 mr-2" />
            )}
            <div>
              <p className={`text-sm font-medium ${isFocusMode ? 'text-timerOrange' : 'text-gray-700'}`}>
                {isFocusMode ? 'Focus Mode is Active' : 'Focus Mode is Inactive'}
              </p>
              <p className="text-xs text-gray-500">
                {isFocusMode 
                  ? 'Only essential elements are visible. Stay focused!' 
                  : 'Activate to hide distractions and focus on your timer.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Ambient Sounds</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {ambientSounds.map(sound => (
            <button
              key={sound.id}
              onClick={() => toggleSound(sound.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                activeSound === sound.id
                  ? 'bg-timerBlue/10 border-timerBlue/30 shadow-md'
                  : 'bg-white/50 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`text-2xl mb-1 ${activeSound === sound.id ? 'animate-pulse-slow' : ''}`}>
                {sound.id === 'rain' ? '🌧️' : sound.id === 'library' ? '📚' : '☕'}
              </div>
              <p className={`text-xs font-medium ${activeSound === sound.id ? 'text-timerBlue' : 'text-gray-700'}`}>
                {sound.name}
              </p>
            </button>
          ))}
        </div>
        
        {activeSound && (
          <div className="flex items-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full mr-2 hover:bg-gray-100 transition-colors"
            >
              {muted ? (
                <VolumeX size={18} className="text-gray-500" />
              ) : (
                <Volume2 size={18} className="text-timerBlue" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={changeVolume}
              className="flex-grow h-2 accent-timerBlue"
            />
            <span className="text-xs text-gray-600 ml-2 w-8 text-right">{volume}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusMode;
