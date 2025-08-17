'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PromiseEntry, getCompletionRate } from '../lib/promiseDatabase';

interface ProgressTimelineProps {
  promise: PromiseEntry;
  viewType?: 'line' | 'bar';
}

export default function ProgressTimeline({ promise, viewType = 'line' }: ProgressTimelineProps) {
  // Generate last 30 days of data
  const generateTimelineData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const historyEntry = promise.history.find(h => h.date === dateStr);
      const completed = historyEntry?.completed || false;
      
      data.push({
        date: dateStr,
        day: date.getDate(),
        completed: completed ? 1 : 0,
        streak: 0 // Will calculate running streak
      });
    }
    
    // Calculate running streak for each day
    let currentStreak = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed) {
        currentStreak++;
      } else {
        currentStreak = 0;
      }
      data[i].streak = currentStreak;
    }
    
    return data;
  };

  const timelineData = generateTimelineData();
  const completionRate = getCompletionRate(promise.history, 30);
  
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{payload: {date: string; completed: boolean; streak?: number}}>; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.date);
      return (
        <div className="glass p-3 rounded-xl border border-white/30 shadow-lg">
          <p className="font-semibold text-gray-800">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
          <p className={`text-sm ${data.completed ? 'text-green-600' : 'text-gray-500'}`}>
            {data.completed ? '✅ Completed' : '⭕ Not completed'}
          </p>
          {(data.streak || 0) > 0 && (
            <p className="text-xs text-gray-600">
              Streak: {data.streak || 0} days
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (viewType === 'bar') {
    return (
      <div className="w-full h-64">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800">30-Day Progress</h4>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span className="text-gray-600">Missed</span>
            </div>
            <span className="font-semibold text-gray-700">{completionRate}% success</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              fill="#10b981"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-800">Streak Timeline</h4>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">Streak</span>
          </div>
          <span className="font-semibold text-gray-700">Current: {promise.streak} days</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timelineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="streak" 
            stroke="#f97316" 
            strokeWidth={3}
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
