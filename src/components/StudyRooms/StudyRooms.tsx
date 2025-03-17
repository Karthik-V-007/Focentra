
import React, { useState } from 'react';
import { StudyRoom, Message } from '@/types/types';
import { Users, MessageSquare, Clock, Crown, PlusCircle, Send, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const demoRooms: StudyRoom[] = [
  {
    id: '1',
    name: 'Biology Study Group',
    subject: 'Biology',
    participants: 5,
    hasActiveTimer: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
  },
  {
    id: '2',
    name: 'Math Problem Solving',
    subject: 'Mathematics',
    participants: 3,
    hasActiveTimer: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    id: '3',
    name: 'Final Exam Prep',
    subject: 'General',
    participants: 8,
    hasActiveTimer: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 180) // 3 hours ago
  }
];

const demoMessages: Message[] = [
  {
    id: '1',
    text: 'Just finished my first pomodoro session!',
    sender: 'Alex',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    roomId: '1'
  },
  {
    id: '2',
    text: 'Great job! I\'m working on chapter 4 now.',
    sender: 'Taylor',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    roomId: '1'
  },
  {
    id: '3',
    text: 'Does anyone have notes on photosynthesis?',
    sender: 'Jordan',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    roomId: '1'
  }
];

const StudyRooms = () => {
  const [rooms, setRooms] = useState<StudyRoom[]>(demoRooms);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [selectedRoom, setSelectedRoom] = useState<StudyRoom | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomSubject, setNewRoomSubject] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [username, setUsername] = useState('You');
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getTimeSince = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };
  
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;
    
    const newMessageObj: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: username,
      timestamp: new Date(),
      roomId: selectedRoom.id
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };
  
  const createRoom = () => {
    if (!newRoomName.trim()) {
      toast.error("Room name can't be empty");
      return;
    }
    
    const newRoom: StudyRoom = {
      id: Date.now().toString(),
      name: newRoomName,
      subject: newRoomSubject || 'General',
      participants: 1,
      hasActiveTimer: false,
      createdAt: new Date()
    };
    
    setRooms([...rooms, newRoom]);
    setSelectedRoom(newRoom);
    setNewRoomName('');
    setNewRoomSubject('');
    setShowCreateRoom(false);
    toast.success('Study room created! Share the link to invite others.');
  };
  
  const joinRoom = (room: StudyRoom) => {
    setSelectedRoom(room);
    toast.success(`Joined ${room.name}`);
  };
  
  const leaveRoom = () => {
    setSelectedRoom(null);
    toast.info('Left the study room');
  };
  
  // Filter messages for the selected room
  const roomMessages = messages.filter(msg => selectedRoom && msg.roomId === selectedRoom.id);
  
  return (
    <div className="glass-card p-5 animate-fade-in w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Study Rooms</h2>
      
      {!selectedRoom ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">Join a room to study with others</p>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="flex items-center bg-timerPurple text-white rounded-xl px-4 py-2 text-sm hover:bg-timerPurple/90 transition-colors"
            >
              <PlusCircle size={16} className="mr-1" />
              New Room
            </button>
          </div>
          
          {showCreateRoom && (
            <div className="mb-5 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 animate-scale-in">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Create New Room</h3>
                <button 
                  onClick={() => setShowCreateRoom(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="E.g., Biology Study Group"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-timerBlue focus:ring focus:ring-timerBlue/20 px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                <input
                  type="text"
                  value={newRoomSubject}
                  onChange={(e) => setNewRoomSubject(e.target.value)}
                  placeholder="E.g., Biology"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-timerBlue focus:ring focus:ring-timerBlue/20 px-3 py-2"
                />
              </div>
              <button
                onClick={createRoom}
                className="w-full bg-timerPurple text-white rounded-md py-2 hover:bg-timerPurple/90 transition-colors"
              >
                Create Room
              </button>
            </div>
          )}
          
          <div className="space-y-3">
            {rooms.map(room => (
              <div 
                key={room.id}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => joinRoom(room)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{room.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${room.hasActiveTimer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {room.hasActiveTimer ? 'Timer Active' : 'Waiting'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users size={16} className="mr-1" />
                  <span>{room.participants} participants</span>
                  <span className="mx-2">•</span>
                  <span>{room.subject}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Created {getTimeSince(room.createdAt)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      joinRoom(room);
                    }}
                    className="px-3 py-1 bg-timerBlue/10 text-timerBlue rounded-full hover:bg-timerBlue/20 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[500px]">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">{selectedRoom.name}</h3>
              <div className="flex items-center text-xs text-gray-600">
                <Users size={14} className="mr-1" />
                <span>{selectedRoom.participants} participants</span>
                <span className="mx-1">•</span>
                <span>{selectedRoom.subject}</span>
              </div>
            </div>
            <button
              onClick={leaveRoom}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Leave Room
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {roomMessages.map(msg => (
              <div 
                key={msg.id}
                className={`flex items-start ${msg.sender === username ? 'justify-end' : ''}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === username 
                      ? 'bg-timerBlue text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.sender !== username && (
                    <div className="font-medium text-xs mb-1">
                      {msg.sender === 'Alex' && <Crown size={12} className="inline mr-1 text-yellow-500" />}
                      {msg.sender}
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-1 ${msg.sender === username ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-auto">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-l-xl border border-gray-200 focus:outline-none focus:border-timerBlue focus:ring-2 focus:ring-timerBlue/20"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-timerBlue text-white rounded-r-xl px-4 hover:bg-timerBlue/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRooms;
