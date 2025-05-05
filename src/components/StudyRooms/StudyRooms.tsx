
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { StudyRoom } from '@/types/types';

// Sample data for study rooms
const sampleRooms: StudyRoom[] = [
  {
    id: "1",
    name: "Math Study Group",
    subject: "Mathematics",
    participants: 5,
    hasActiveTimer: true,
    createdAt: new Date(),
    createdBy: "user1", // Adding the required createdBy property
  },
  {
    id: "2",
    name: "Computer Science Discussion",
    subject: "Computer Science",
    participants: 3,
    hasActiveTimer: false,
    createdAt: new Date(),
    createdBy: "user2", // Adding the required createdBy property
  },
  {
    id: "3",
    name: "Physics Exam Prep",
    subject: "Physics",
    participants: 4,
    hasActiveTimer: true,
    createdAt: new Date(),
    createdBy: "user3", // Adding the required createdBy property
  }
];

const StudyRooms: React.FC = () => {
  const [rooms, setRooms] = useState<StudyRoom[]>(sampleRooms);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomSubject, setNewRoomSubject] = useState('');

  const handleCreateRoom = () => {
    if (newRoomName && newRoomSubject) {
      const newRoom: StudyRoom = {
        id: `${rooms.length + 1}`,
        name: newRoomName,
        subject: newRoomSubject,
        participants: 1,
        hasActiveTimer: false,
        createdAt: new Date(),
        createdBy: "currentUser", // Adding the required createdBy property
      };
      
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
      setNewRoomSubject('');
      setShowCreateForm(false);
    }
  };

  const joinRoom = (roomId: string) => {
    console.log(`Joining room ${roomId}`);
    // Logic to join a room would go here
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Rooms</h2>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-timerGreen text-white"
        >
          {showCreateForm ? 'Cancel' : 'Create Room'}
        </Button>
      </div>

      {showCreateForm && (
        <div className="p-4 bg-white rounded-lg shadow space-y-4">
          <h3 className="font-medium">Create a new study room</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Room Name</label>
            <input 
              type="text" 
              value={newRoomName} 
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input 
              type="text" 
              value={newRoomSubject} 
              onChange={(e) => setNewRoomSubject(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <Button onClick={handleCreateRoom}>Create</Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{room.name}</h3>
            <p className="text-sm text-gray-600">{room.subject}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm">{room.participants} participants</span>
              <span className={`text-xs px-2 py-1 rounded ${room.hasActiveTimer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {room.hasActiveTimer ? 'Timer Active' : 'No Timer'}
              </span>
            </div>
            <Button 
              onClick={() => joinRoom(room.id)} 
              className="w-full mt-4"
              variant="outline"
            >
              Join Room
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyRooms;
