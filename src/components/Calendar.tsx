import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeekPeriod, LeaveRequest } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
  leaveRequests: LeaveRequest[];
  onWeekClick: (week: WeekPeriod) => void;
}

export function Calendar({ leaveRequests, onWeekClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const navigate = useNavigate();

  const generateWeekPeriods = (date: Date): WeekPeriod[] => {
    const periods: WeekPeriod[] = [];
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    let currentWeek = 1;
    let currentDate = new Date(startOfMonth);

    while (currentDate <= endOfMonth) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);

      periods.push({
        weekNumber: currentWeek,
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString(),
      });

      currentDate.setDate(currentDate.getDate() + 7);
      currentWeek++;
    }

    return periods;
  };

  const weekPeriods = generateWeekPeriods(currentDate);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const toggleWeek = (week: WeekPeriod) => {
    if (expandedWeek === week.weekNumber) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(week.weekNumber);
      onWeekClick(week);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CalendarIcon className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Calendário de Folgas</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {weekPeriods.map((week) => (
          <motion.div
            key={week.weekNumber}
            layout
            onClick={() => toggleWeek(week)}
            className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <h3 className="font-medium text-gray-800">
              Semana {week.weekNumber}: {new Date(week.startDate).toLocaleDateString('pt-BR')} a{' '}
              {new Date(week.endDate).toLocaleDateString('pt-BR')}
            </h3>
            
            <AnimatePresence>
              {expandedWeek === week.weekNumber && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {leaveRequests
                    .filter(
                      (leave) =>
                        new Date(leave.startDate) >= new Date(week.startDate) &&
                        new Date(leave.endDate) <= new Date(week.endDate)
                    )
                    .map((leave) => (
                      <motion.div
                        key={leave.id}
                        onClick={(e) => {
                          // Impede que o clique na "folga" feche o card
                          e.stopPropagation();
                          navigate(`/employees/${leave.employeeId}`);
                        }}
                        className={`mt-2 p-2 rounded-md text-sm ${
                          leave.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : leave.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {leave.type === 'vacation'
                          ? 'Férias'
                          : leave.type === 'maternity'
                          ? 'Licença Maternidade'
                          : 'Folga'}{' '}
                        - {new Date(leave.startDate).toLocaleDateString('pt-BR')}
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
