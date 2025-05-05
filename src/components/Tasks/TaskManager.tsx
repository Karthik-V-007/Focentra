
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Task } from '@/types/types';

// Sample data for tasks
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete Math Assignment",
    subject: "Mathematics",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    completed: false,
    priority: 2,
    createdAt: new Date(),
    isPersonal: true, // Adding the required isPersonal property
  },
  {
    id: "2",
    title: "Review Lecture Notes",
    subject: "Computer Science",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    completed: false,
    priority: 1,
    createdAt: new Date(),
    isPersonal: true, // Adding the required isPersonal property
  },
  {
    id: "3",
    title: "Submit Research Paper",
    subject: "Physics",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    completed: true,
    priority: 3,
    createdAt: new Date(),
    isPersonal: true, // Adding the required isPersonal property
  }
];

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState(1);

  const handleAddTask = () => {
    if (newTaskTitle && newTaskSubject) {
      const newTask: Task = {
        id: `${tasks.length + 1}`,
        title: newTaskTitle,
        subject: newTaskSubject,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        completed: false,
        priority: newTaskPriority,
        createdAt: new Date(),
        isPersonal: true, // Adding the required isPersonal property
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskSubject('');
      setNewTaskPriority(1);
      setShowAddForm(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-timerBlue text-white"
        >
          {showAddForm ? 'Cancel' : 'Add Task'}
        </Button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-white rounded-lg shadow space-y-4">
          <h3 className="font-medium">Add a new task</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input 
              type="text" 
              value={newTaskTitle} 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input 
              type="text" 
              value={newTaskSubject} 
              onChange={(e) => setNewTaskSubject(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority (1-3)</label>
            <input 
              type="number" 
              min="1" 
              max="3"
              value={newTaskPriority} 
              onChange={(e) => setNewTaskPriority(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="flex justify-between">
              <div>
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                <p className="text-sm text-gray-600">{task.subject}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  Due: {task.dueDate.toLocaleDateString()}
                </span>
                <span 
                  className={`text-xs px-2 py-1 rounded ${
                    task.priority === 3 ? 'bg-red-100 text-red-800' : 
                    task.priority === 2 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}
                >
                  {task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                </span>
                <Button 
                  onClick={() => toggleTaskCompletion(task.id)}
                  variant="ghost"
                  size="sm"
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
