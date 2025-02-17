import React, { useState } from 'react';
import { Calendar } from '../components/Calendar';
import { LeaveRequestForm } from '../components/LeaveRequestForm';
import { EmployeeSchedule } from '../components/EmployeeSchedule';
import { DatePicker } from '../components/DatePicker';
import type { Employee, LeaveRequest, WeekPeriod } from '../types';

interface CalendarPageProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  onLeaveRequestSubmit: (request: Omit<LeaveRequest, 'id' | 'status'>) => void;
  isDark: boolean;
  showForm: boolean;
  onToggleForm: () => void;
}

export function CalendarPage({
  employees,
  leaveRequests,
  onLeaveRequestSubmit,
  isDark,
  showForm,
  onToggleForm,
}: CalendarPageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleWeekClick = (week: WeekPeriod) => {
    setSelectedDate(week.startDate.split('T')[0]);
    setShowSchedule(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DatePicker value={selectedDate} onChange={setSelectedDate} isDark={isDark} />
        <button
          onClick={onToggleForm}
          className={`px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showForm ? 'Voltar ao Calendário' : 'Nova Solicitação'}
        </button>
      </div>

      {/* Renderiza a agenda do funcionário para a data selecionada */}
      {showSchedule && (
        <EmployeeSchedule
          date={selectedDate}
          employees={employees}
          leaveRequests={leaveRequests}
          isDark={isDark}
        />
      )}

      {/* Dependendo do estado, renderiza o formulário ou o calendário */}
      {showForm ? (
        <LeaveRequestForm
          employees={employees}
          onSubmit={onLeaveRequestSubmit}
          isDark={isDark}
        />
      ) : (
        <Calendar
          leaveRequests={leaveRequests}
          onWeekClick={handleWeekClick}
          isDark={isDark}
        />
      )}
    </div>
  );
}
