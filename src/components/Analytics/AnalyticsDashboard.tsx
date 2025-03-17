
import React, { useState } from 'react';
import { DailyStats, SubjectBreakdown, Achievement } from '@/types/types';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Pie, PieChart, Legend } from 'recharts';
import { Calendar, Award, TrendingUp, Clock } from 'lucide-react';

// Demo data for analytics
const demoWeeklyStats: DailyStats[] = [
  { date: 'Mon', totalMinutes: 95, completedTasks: 3, totalSessions: 3 },
  { date: 'Tue', totalMinutes: 125, completedTasks: 4, totalSessions: 5 },
  { date: 'Wed', totalMinutes: 70, completedTasks: 2, totalSessions: 2 },
  { date: 'Thu', totalMinutes: 150, completedTasks: 5, totalSessions: 6 },
  { date: 'Fri', totalMinutes: 80, completedTasks: 3, totalSessions: 3 },
  { date: 'Sat', totalMinutes: 60, completedTasks: 2, totalSessions: 2 },
  { date: 'Sun', totalMinutes: 120, completedTasks: 4, totalSessions: 4 }
];

const demoSubjectBreakdown: SubjectBreakdown[] = [
  { subject: 'Math', minutes: 180, percentage: 25.7, color: '#6C9BCF' },
  { subject: 'Biology', minutes: 150, percentage: 21.4, color: '#88C9A1' },
  { subject: 'Physics', minutes: 120, percentage: 17.1, color: '#FFD166' },
  { subject: 'History', minutes: 100, percentage: 14.3, color: '#9C89B8' },
  { subject: 'Literature', minutes: 95, percentage: 13.6, color: '#FFA364' },
  { subject: 'Other', minutes: 55, percentage: 7.9, color: '#ABABAB' }
];

const demoAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Focus Master',
    description: 'Complete 25 Pomodoro sessions',
    icon: '🎯',
    achieved: true
  },
  {
    id: '2',
    title: 'Task Champion',
    description: 'Complete 20 tasks',
    icon: '✅',
    achieved: true
  },
  {
    id: '3',
    title: 'Study Streak',
    description: 'Study for 5 days in a row',
    icon: '🔥',
    achieved: true
  },
  {
    id: '4',
    title: 'Time Wizard',
    description: 'Accumulate 10 hours of focus time',
    icon: '⏰',
    achieved: false,
    progress: 7,
    goal: 10
  },
  {
    id: '5',
    title: 'Collaboration King',
    description: 'Join 5 different study rooms',
    icon: '👥',
    achieved: false,
    progress: 3,
    goal: 5
  }
];

const totalTimeSpent = demoSubjectBreakdown.reduce((acc, item) => acc + item.minutes, 0);
const totalHours = Math.floor(totalTimeSpent / 60);
const totalMinutes = totalTimeSpent % 60;

const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-xs border border-gray-100">
        <p className="font-medium">{`${payload[0].payload.date}`}</p>
        <p className="text-timerBlue">{`${payload[0].value} minutes`}</p>
        <p className="text-gray-600">{`${payload[0].payload.completedTasks} tasks done`}</p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-xs border border-gray-100">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-gray-600">{`${payload[0].value} minutes (${payload[0].payload.percentage}%)`}</p>
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  
  return (
    <div className="glass-card p-5 animate-fade-in w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeframe === 'weekly' 
                ? 'bg-timerBlue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              timeframe === 'monthly' 
                ? 'bg-timerBlue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-timerBlue/10 rounded-full flex items-center justify-center mr-2">
              <Clock size={18} className="text-timerBlue" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">Daily Study Time</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoWeeklyStats} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis 
                  hide={true}
                  domain={[0, 'dataMax + 30']}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar 
                  dataKey="totalMinutes" 
                  radius={[4, 4, 0, 0]}
                >
                  {demoWeeklyStats.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 3 ? '#6C9BCF' : '#C4DDFF'} // Highlight Thursday
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-timerGreen/10 rounded-full flex items-center justify-center mr-2">
              <TrendingUp size={18} className="text-timerGreen" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">Subject Breakdown</h3>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demoSubjectBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="minutes"
                  nameKey="subject"
                >
                  {demoSubjectBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-timerBlue/10 rounded-full flex items-center justify-center mr-3">
            <Clock size={20} className="text-timerBlue" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-500">Total Focus Time</h3>
            <p className="text-xl font-bold text-gray-800">{totalHours}h {totalMinutes}m</p>
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-timerGreen/10 rounded-full flex items-center justify-center mr-3">
            <Calendar size={20} className="text-timerGreen" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-500">Completed Tasks</h3>
            <p className="text-xl font-bold text-gray-800">23</p>
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-timerOrange/10 rounded-full flex items-center justify-center mr-3">
            <Award size={20} className="text-timerOrange" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-500">Achievements</h3>
            <p className="text-xl font-bold text-gray-800">{demoAchievements.filter(a => a.achieved).length}/{demoAchievements.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-timerOrange/10 rounded-full flex items-center justify-center mr-2">
            <Award size={18} className="text-timerOrange" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700">Achievements</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {demoAchievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`p-3 rounded-lg border ${
                achievement.achieved 
                  ? 'bg-timerOrange/5 border-timerOrange/20' 
                  : 'bg-gray-50 border-gray-200'
              } transition-all duration-300`}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-2">{achievement.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              {!achievement.achieved && achievement.progress && achievement.goal && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-timerOrange h-1.5 rounded-full"
                      style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {achievement.progress}/{achievement.goal} completed
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
