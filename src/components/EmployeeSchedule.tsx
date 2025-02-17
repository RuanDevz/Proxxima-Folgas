import React from 'react';
import { Employee, LeaveRequest } from '../types';
import { UserCheck, UserX } from 'lucide-react';

interface EmployeeScheduleProps {
  date: string;
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  isDark: boolean;
}

export function EmployeeSchedule({ date, employees, leaveRequests, isDark }: EmployeeScheduleProps) {
  const isOnLeave = (employeeId: string, date: string) => {
    return leaveRequests.some(
      leave =>
        leave.employeeId === employeeId &&
        leave.status === 'approved' &&
        new Date(date) >= new Date(leave.startDate) &&
        new Date(date) <= new Date(leave.endDate)
    );
  };

  const getLeaveType = (employeeId: string, date: string) => {
    return leaveRequests.find(
      leave =>
        leave.employeeId === employeeId &&
        leave.status === 'approved' &&
        new Date(date) >= new Date(leave.startDate) &&
        new Date(date) <= new Date(leave.endDate)
    )?.type;
  };

  return (
    <div className={`rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Escala do dia {new Date(date).toLocaleDateString('pt-BR')}
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`text-md font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <UserCheck className="w-5 h-5 inline-block mr-2 text-green-500" />
              Presentes
            </h4>
            <ul className="space-y-3">
              {employees
                .filter(emp => !isOnLeave(emp.id, date))
                .map(emp => (
                  <li
                    key={emp.id}
                    className={`flex items-center space-x-3 p-2 rounded ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {emp.name}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {emp.role}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-md font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <UserX className="w-5 h-5 inline-block mr-2 text-red-500" />
              Ausentes
            </h4>
            <ul className="space-y-3">
              {employees
                .filter(emp => isOnLeave(emp.id, date))
                .map(emp => {
                  const leaveType = getLeaveType(emp.id, date);
                  return (
                    <li
                      key={emp.id}
                      className={`flex items-center space-x-3 p-2 rounded ${
                        isDark ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {emp.name}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {leaveType === 'vacation'
                            ? 'Férias'
                            : leaveType === 'maternity'
                            ? 'Licença Maternidade'
                            : 'Folga'}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}