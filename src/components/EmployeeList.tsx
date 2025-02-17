import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Employee, LeaveRequest, Filters } from '../types';

interface EmployeeListProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  isDark: boolean;
}

export function EmployeeList({ employees, leaveRequests, filters, onFilterChange, isDark }: EmployeeListProps) {
  const filteredEmployees = employees.filter(employee => {
    const matchesGender = filters.gender === 'all' || employee.gender === filters.gender;
    const matchesSearch = employee.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    if (filters.leaveType === 'all') {
      return matchesGender && matchesSearch;
    }

    const hasMatchingLeave = leaveRequests.some(
      leave => leave.employeeId === employee.id && leave.type === filters.leaveType
    );

    return matchesGender && matchesSearch && hasMatchingLeave;
  });

  const getWeekendRotation = (employeeId: string) => {
    const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const employeeIndex = parseInt(employeeId);
    return (currentWeek + employeeIndex) % 2 === 0 ? 'Sábado' : 'Domingo';
  };

  return (
    <div className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
      <div className="flex items-center mb-6">
        <User className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Lista de Funcionários
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <motion.div 
            className="flex-1 min-w-[200px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Buscar funcionário..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
                className={`pl-10 w-full rounded-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <select
              value={filters.gender}
              onChange={(e) => onFilterChange({ ...filters, gender: e.target.value as Filters['gender'] })}
              className={`rounded-md shadow-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">Todos os Gêneros</option>
              <option value="male">Homens</option>
              <option value="female">Mulheres</option>
            </select>

            <select
              value={filters.leaveType}
              onChange={(e) => onFilterChange({ ...filters, leaveType: e.target.value as Filters['leaveType'] })}
              className={`rounded-md shadow-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">Todos os Tipos</option>
              <option value="vacation">Férias</option>
              <option value="dayoff">Folga</option>
              <option value="maternity">Licença Maternidade</option>
              <option value="other">Outros</option>
            </select>
          </motion.div>
        </div>
      </div>

      <div className={`overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>Nome</th>
              <th className={`px-3 py-3.5 text-left text-sm font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>Departamento</th>
              <th className={`px-3 py-3.5 text-left text-sm font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>Gênero</th>
              <th className={`px-3 py-3.5 text-left text-sm font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>Data Contratação</th>
              <th className={`px-3 py-3.5 text-left text-sm font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <AnimatePresence>
              {filteredEmployees.map((employee) => {
                const activeLeaves = leaveRequests.filter(
                  leave => leave.employeeId === employee.id && 
                          leave.status === 'approved' &&
                          new Date(leave.endDate) >= new Date()
                );

                return (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm">
                      <Link to={`/employees/${employee.id}`} className="block">
                        <div className="flex items-center">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <div>
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {employee.name}
                            </div>
                            <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className={`px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.department}
                    </td>
                    <td className={`px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      {employee.gender === 'male' ? 'Masculino' : 'Feminino'}
                    </td>
                    <td className={`px-3 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      {new Date(employee.hireDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {activeLeaves.map((leave) => (
                          <span
                            key={leave.id}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              leave.type === 'vacation'
                                ? 'bg-green-100 text-green-800'
                                : leave.type === 'maternity'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {leave.type === 'vacation'
                              ? 'Férias'
                              : leave.type === 'maternity'
                              ? 'Licença Maternidade'
                              : 'Folga'}
                          </span>
                        ))}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          Folga: {getWeekendRotation(employee.id)}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}