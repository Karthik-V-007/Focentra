
import React, { useState } from 'react';
import { DistractionLog } from '@/types/types';
import { BookOpenCheck, Plus, Trash2, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const initialDistractions: DistractionLog[] = [
  {
    id: '1',
    text: 'Checked social media',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    sessionId: 'session1'
  },
  {
    id: '2',
    text: 'Answered a phone call',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    sessionId: 'session1'
  },
  {
    id: '3',
    text: 'Got hungry and went for a snack',
    timestamp: new Date(Date.now() - 1000 * 60 * 150),
    sessionId: 'session2'
  },
  {
    id: '4',
    text: 'Started thinking about weekend plans',
    timestamp: new Date(Date.now() - 1000 * 60 * 200),
    sessionId: 'session2'
  }
];

const commonDistractions = [
  'Social media',
  'Phone notification',
  'Email checking',
  'Hunger/Thirst',
  'Wandering thoughts',
  'Noise distraction',
  'Conversation with someone'
];

const DistractionJournal = () => {
  const [distractions, setDistractions] = useState<DistractionLog[]>(initialDistractions);
  const [newDistraction, setNewDistraction] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showCommonDistractions, setShowCommonDistractions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const addDistraction = (text = newDistraction) => {
    if (!text.trim()) {
      toast.error("Distraction text can't be empty");
      return;
    }
    
    const newLog: DistractionLog = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      sessionId: 'currentSession' // In a real app, this would be the actual session ID
    };
    
    setDistractions([newLog, ...distractions]);
    setNewDistraction('');
    setShowCommonDistractions(false);
    toast.success('Distraction logged');
  };
  
  const deleteDistraction = (id: string) => {
    setDistractions(distractions.filter(d => d.id !== id));
    toast.info('Distraction removed');
  };
  
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const filteredDistractions = searchQuery
    ? distractions.filter(d => d.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : distractions;
  
  return (
    <div className="glass-card p-5 animate-fade-in w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Distraction Journal</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          aria-label={isExpanded ? "Collapse journal" : "Expand journal"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={newDistraction}
                onChange={(e) => setNewDistraction(e.target.value)}
                placeholder="What distracted you? Log it here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 pr-12 focus:outline-none focus:border-timerPurple focus:ring-2 focus:ring-timerPurple/20"
                onKeyDown={(e) => e.key === 'Enter' && addDistraction()}
              />
              <button
                onClick={() => addDistraction()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-timerPurple text-white hover:bg-timerPurple/90 transition-colors"
                aria-label="Add distraction"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={() => setShowCommonDistractions(!showCommonDistractions)}
                className="text-xs text-timerPurple hover:text-timerPurple/80 transition-colors"
              >
                {showCommonDistractions ? 'Hide common distractions' : 'Show common distractions'}
              </button>
              
              <div className="relative">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
                <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="pl-8 pr-8 py-1 text-xs rounded-full border border-gray-200 w-36 focus:outline-none focus:border-timerPurple focus:ring-1 focus:ring-timerPurple/20 focus:w-44 transition-all"
                />
              </div>
            </div>
            
            {showCommonDistractions && (
              <div className="mt-2 flex flex-wrap gap-2">
                {commonDistractions.map((distraction, index) => (
                  <button
                    key={index}
                    onClick={() => addDistraction(distraction)}
                    className="text-xs px-3 py-1 rounded-full bg-timerPurple/10 text-timerPurple hover:bg-timerPurple/20 transition-colors"
                  >
                    {distraction}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {filteredDistractions.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredDistractions.map(distraction => (
                <div 
                  key={distraction.id}
                  className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-800">{distraction.text}</p>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <BookOpenCheck size={12} className="mr-1" />
                      <span>Logged at {formatTimestamp(distraction.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteDistraction(distraction.id)}
                    className="p-1.5 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                    aria-label="Delete distraction"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              {searchQuery ? 'No matching distractions found.' : 'No distractions logged yet. Stay focused!'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DistractionJournal;
