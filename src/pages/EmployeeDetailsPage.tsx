import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  ChevronLeft,
  Users,
} from 'lucide-react';
import type { Employee, LeaveRequest } from '../types';

interface EmployeeDetailsPageProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  isDark: boolean;
}

export function EmployeeDetailsPage({
  employees,
  leaveRequests,
  isDark,
}: EmployeeDetailsPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const employee = employees.find(emp => emp.id === id);
  
  if (!employee) {
    return <div>Funcionário não encontrado</div>;
  }

  const employeeLeaves = leaveRequests.filter(leave => leave.employeeId === id);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isEmployeeWeekendOff = (date: Date) => {
    const weekNumber = Math.floor(date.getTime() / (7 * 24 * 60 * 60 * 1000));
    const employeeIndex = parseInt(employee.id);
    const isSaturdayOff = (weekNumber + employeeIndex) % 2 === 0;
    return date.getDay() === 6 ? isSaturdayOff : !isSaturdayOff;
  };

  const isLeaveDay = (date: Date) => {
    return employeeLeaves.some(
      leave =>
        leave.status === 'approved' &&
        date >= new Date(leave.startDate) &&
        date <= new Date(leave.endDate)
    );
  };

  const getLeaveType = (date: Date) => {
    return employeeLeaves.find(
      leave =>
        leave.status === 'approved' &&
        date >= new Date(leave.startDate) &&
        date <= new Date(leave.endDate)
    )?.type;
  };

  const days = getDaysInMonth(selectedMonth);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedMonth(newDate);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => navigate('/employees')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}
      >
        <div className="flex items-start space-x-6">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {employee.name}
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <Mail className="w-5 h-5 mr-2" />
                {employee.email}
              </div>
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <Phone className="w-5 h-5 mr-2" />
                {employee.phone}
              </div>
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <MapPin className="w-5 h-5 mr-2" />
                {employee.address}
              </div>
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <Calendar className="w-5 h-5 mr-2" />
                Data de Nascimento: {new Date(employee.birthDate).toLocaleDateString('pt-BR')}
              </div>
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <Briefcase className="w-5 h-5 mr-2" />
                {employee.role} - {employee.department}
              </div>
              <div className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <Users className="w-5 h-5 mr-2" />
                Contratação: {new Date(employee.hireDate).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Calendário de Folgas e Férias
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 transform rotate-180" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div
              key={day}
              className={`text-center py-2 font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
          
          {Array.from({ length: days[0].getDay() }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          
          {days.map(date => {
            const isOff = isWeekend(date) && isEmployeeWeekendOff(date);
            const isLeave = isLeaveDay(date);
            const leaveType = getLeaveType(date);

            return (
              <motion.div
                key={date.getTime()}
                whileHover={{ scale: 1.05 }}
                className={`p-2 rounded-lg text-center ${
                  isLeave
                    ? leaveType === 'vacation'
                      ? isDark
                        ? 'bg-green-800 text-white'
                        : 'bg-green-100 text-green-800'
                      : leaveType === 'maternity'
                      ? isDark
                        ? 'bg-pink-800 text-white'
                        : 'bg-pink-100 text-pink-800'
                      : isDark
                      ? 'bg-blue-800 text-white'
                      : 'bg-blue-100 text-blue-800'
                    : isOff
                    ? isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                    : isDark
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-900'
                } ${isDark ? 'border-gray-700' : 'border'} border`}
              >
                <div className="font-medium">{date.getDate()}</div>
                {isLeave && (
                  <div className="text-xs mt-1">
                    {leaveType === 'vacation'
                      ? 'Férias'
                      : leaveType === 'maternity'
                      ? 'Licença'
                      : 'Folga'}
                  </div>
                )}
                {isOff && !isLeave && <div className="text-xs mt-1">Folga</div>}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}