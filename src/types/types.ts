
export type TimerMode = 'work' | 'break';

export type TimerSettings = {
  workDuration: number;  // in minutes
  breakDuration: number; // in minutes
  sessionsGoal: number;
};

export type UserRole = 'student' | 'professor' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};

export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: Date | null;
  completed: boolean;
  priority: number;
  createdAt: Date;
  assignedBy?: string; // professor ID if assigned by professor
  assignedTo?: string[]; // student IDs if assigned to students
  isPersonal: boolean; // true if created by student for themselves
};

export type DistractionLog = {
  id: string;
  text: string;
  timestamp: Date;
  sessionId: string;
};

export type StudyRoom = {
  id: string;
  name: string;
  subject: string;
  participants: number;
  hasActiveTimer: boolean;
  createdAt: Date;
  createdBy: string; // user ID who created the room
  isClassRoom?: boolean; // if true, this is a professor's class room
};

export type StudySession = {
  id: string;
  date: Date;
  duration: number; // in minutes
  subject: string | null;
  completed: boolean;
};

export type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  roomId: string;
};

export type Subject = {
  id: string;
  name: string;
  color: string;
};

export type DailyStats = {
  date: string;
  totalMinutes: number;
  completedTasks: number;
  totalSessions: number;
};

export type SubjectBreakdown = {
  subject: string;
  minutes: number;
  percentage: number;
  color: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  progress?: number;
  goal?: number;
};

export type AmbientSound = {
  id: string;
  name: string;
  file: string;
};

export type Class = {
  id: string;
  name: string;
  subject: string;
  professorId: string;
  studentIds: string[];
  createdAt: Date;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  classId: string;
  taskIds: string[]; // references to tasks
  createdAt: Date;
  createdBy: string; // professor ID
};
