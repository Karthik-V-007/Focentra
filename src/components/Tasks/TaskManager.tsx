
import React, { useState, useEffect } from 'react';
import { Task } from '@/types/types';
import { CheckCircle2, Circle, Plus, Calendar, Clock, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Read Chapter 4',
    subject: 'Biology',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    completed: false,
    priority: 1,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Complete Problem Set',
    subject: 'Math',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
    completed: false,
    priority: 2,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Review Notes',
    subject: 'History',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 36),
    completed: true,
    priority: 3,
    createdAt: new Date()
  }
];

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  
  const addTask = () => {
    if (!newTaskTitle) {
      toast.error("Task name can't be empty");
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      subject: newTaskSubject || 'General',
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : null,
      completed: false,
      priority: tasks.length + 1,
      createdAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskSubject('');
    setNewTaskDueDate('');
    toast.success('Task added successfully');
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info('Task removed');
  };
  
  const moveTaskUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
    // Update priorities
    newTasks[index].priority = index + 1;
    newTasks[index - 1].priority = index;
    setTasks(newTasks);
  };
  
  const moveTaskDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    // Update priorities
    newTasks[index].priority = index + 1;
    newTasks[index + 1].priority = index + 2;
    setTasks(newTasks);
  };
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update priorities
    const updatedItems = items.map((item, index) => ({
      ...item,
      priority: index + 1
    }));
    
    setTasks(updatedItems);
  };
  
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  
  const getDueDateStyle = (dueDate: Date | null) => {
    if (!dueDate) return { className: '', text: 'No due date' };
    
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = dueDate.toDateString() === now.toDateString();
    const isTomorrow = dueDate.toDateString() === tomorrow.toDateString();
    const isPast = dueDate < now;
    
    if (isPast) {
      return { 
        className: 'text-red-600 font-medium', 
        text: `Overdue: ${dueDate.toLocaleDateString()}`
      };
    }
    
    if (isToday) {
      return { 
        className: 'text-timerOrange font-medium', 
        text: 'Due Today' 
      };
    }
    
    if (isTomorrow) {
      return { 
        className: 'text-yellow-600 font-medium', 
        text: 'Due Tomorrow' 
      };
    }
    
    return { 
      className: 'text-gray-600', 
      text: `Due: ${dueDate.toLocaleDateString()}` 
    };
  };
  
  const getSubjectPill = (subject: string) => {
    const subjects: Record<string, string> = {
      Math: 'bg-blue-100 text-blue-800',
      Biology: 'bg-green-100 text-green-800',
      Physics: 'bg-purple-100 text-purple-800',
      Chemistry: 'bg-indigo-100 text-indigo-800',
      History: 'bg-amber-100 text-amber-800',
      Literature: 'bg-pink-100 text-pink-800',
      Language: 'bg-cyan-100 text-cyan-800',
      Programming: 'bg-emerald-100 text-emerald-800',
      General: 'bg-gray-100 text-gray-800'
    };
    
    return subjects[subject] || subjects.General;
  };
  
  return (
    <div className="glass-card p-5 animate-fade-in w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Tasks</h2>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="px-4 py-2 rounded-xl border border-gray-200 flex-grow focus:outline-none focus:border-timerBlue focus:ring-2 focus:ring-timerBlue/20"
          />
          <input
            type="text"
            value={newTaskSubject}
            onChange={(e) => setNewTaskSubject(e.target.value)}
            placeholder="Subject (optional)"
            className="px-4 py-2 rounded-xl border border-gray-200 w-full md:w-36 focus:outline-none focus:border-timerBlue focus:ring-2 focus:ring-timerBlue/20"
          />
          <input
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 w-full md:w-auto focus:outline-none focus:border-timerBlue focus:ring-2 focus:ring-timerBlue/20"
          />
          <button
            onClick={addTask}
            className="flex items-center justify-center bg-timerBlue text-white rounded-xl px-5 py-2 hover:bg-timerBlue/90 transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div 
            className="h-2 rounded-full bg-timerGreen transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600">
          {completedTasks.length}/{totalTasks} tasks completed ({completionPercentage}%)
        </div>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul 
              className="space-y-2 mb-4" 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pendingTasks.map((task, index) => {
                const dueDateStyle = getDueDateStyle(task.dueDate);
                
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-item"
                      >
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => toggleTaskCompletion(task.id)}
                            className="flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 size={22} className="text-timerGreen" />
                            ) : (
                              <Circle size={22} className="text-gray-400" />
                            )}
                          </button>
                          <div>
                            <div className="text-gray-900 font-medium">{task.title}</div>
                            <div className="flex items-center mt-1 space-x-2 text-xs">
                              <span className={`pill ${getSubjectPill(task.subject)}`}>
                                {task.subject}
                              </span>
                              <span className={`flex items-center ${dueDateStyle.className}`}>
                                <Calendar size={14} className="mr-1" />
                                {dueDateStyle.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => moveTaskUp(index)}
                            className="p-1 hover:bg-gray-100 rounded-full mr-1"
                          >
                            <ArrowUp size={18} className="text-gray-500" />
                          </button>
                          <button 
                            onClick={() => moveTaskDown(index)}
                            className="p-1 hover:bg-gray-100 rounded-full mr-1"
                          >
                            <ArrowDown size={18} className="text-gray-500" />
                          </button>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="p-1 hover:bg-red-100 rounded-full text-red-500"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
        >
          {showCompleted ? 'Hide completed' : 'Show completed'} ({completedTasks.length})
        </button>
        
        {showCompleted && completedTasks.length > 0 && (
          <ul className="mt-3 space-y-2 opacity-70">
            {completedTasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="flex-shrink-0"
                  >
                    <CheckCircle2 size={22} className="text-timerGreen" />
                  </button>
                  <div>
                    <div className="text-gray-500 line-through">{task.title}</div>
                    <div className="flex items-center mt-1 space-x-2 text-xs">
                      <span className={`pill ${getSubjectPill(task.subject)} opacity-60`}>
                        {task.subject}
                      </span>
                      <span className="text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-1 hover:bg-red-100 rounded-full text-red-400"
                >
                  <XCircle size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
