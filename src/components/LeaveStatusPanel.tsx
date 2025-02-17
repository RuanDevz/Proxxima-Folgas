import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Baby, Sun, Users } from 'lucide-react';
import type { Employee, LeaveRequest } from '../types';

interface LeaveStatusPanelProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  isDark: boolean;
}

export function LeaveStatusPanel({ employees, leaveRequests, isDark }: LeaveStatusPanelProps) {
  const getCurrentLeaves = () => {
    const today = new Date();
    return leaveRequests.filter(
      leave =>
        leave.status === 'approved' &&
        new Date(leave.startDate) <= today &&
        new Date(leave.endDate) >= today
    );
  };

  const currentLeaves = getCurrentLeaves();

  const getWeekendRotation = (employeeId: string) => {
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const employeeIndex = parseInt(employeeId);
    return (currentWeek + employeeIndex) % 2 === 0 ? 'Sábado' : 'Domingo';
  };

  return (
    <div className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Painel de Ausências
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Férias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 ${
            isDark ? 'bg-gray-700' : 'bg-blue-50'
          }`}
        >
          <div className="flex items-center mb-4">
            <Calendar className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Em Férias
            </h3>
          </div>
          <AnimatePresence>
            {currentLeaves
              .filter(leave => leave.type === 'vacation')
              .map(leave => {
                const employee = employees.find(emp => emp.id === leave.employeeId);
                return (
                  <motion.div
                    key={leave.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`mb-2 p-2 rounded ${
                      isDark ? 'bg-gray-600' : 'bg-white'
                    } shadow`}
                  >
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {employee?.name}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Retorno: {new Date(leave.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>

        {/* Licença Maternidade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-lg p-4 ${
            isDark ? 'bg-gray-700' : 'bg-pink-50'
          }`}
        >
          <div className="flex items-center mb-4">
            <Baby className={`w-6 h-6 ${isDark ? 'text-pink-400' : 'text-pink-600'} mr-2`} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Licença Maternidade
            </h3>
          </div>
          <AnimatePresence>
            {currentLeaves
              .filter(leave => leave.type === 'maternity')
              .map(leave => {
                const employee = employees.find(emp => emp.id === leave.employeeId);
                return (
                  <motion.div
                    key={leave.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`mb-2 p-2 rounded ${
                      isDark ? 'bg-gray-600' : 'bg-white'
                    } shadow`}
                  >
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {employee?.name}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Retorno: {new Date(leave.endDate).toLocaleDateString('pt-BR')}
                    </p>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>

        {/* Folgas de Fim de Semana */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-lg p-4 ${
            isDark ? 'bg-gray-700' : 'bg-yellow-50'
          }`}
        >
          <div className="flex items-center mb-4">
            <Sun className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'} mr-2`} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Folgas do Fim de Semana
            </h3>
          </div>
          <AnimatePresence>
            {employees.map(employee => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`mb-2 p-2 rounded ${
                  isDark ? 'bg-gray-600' : 'bg-white'
                } shadow`}
              >
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {employee.name}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Folga: {getWeekendRotation(employee.id)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}