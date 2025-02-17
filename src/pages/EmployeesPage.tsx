import React from 'react';
import { motion } from 'framer-motion';
import { EmployeeList } from '../components/EmployeeList';
import { EmployeeForm } from '../components/EmployeeForm';
import { LeaveStatusPanel } from '../components/LeaveStatusPanel';
import type { Employee, LeaveRequest, Filters } from '../types';

interface EmployeesPageProps {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onEmployeeSubmit: (employee: Omit<Employee, 'id'>) => void;
  isDark: boolean;
  showForm: boolean;
  onToggleForm: () => void;
}

export function EmployeesPage({
  employees,
  leaveRequests,
  filters,
  onFilterChange,
  onEmployeeSubmit,
  isDark,
  showForm,
  onToggleForm,
}: EmployeesPageProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LeaveStatusPanel
          employees={employees}
          leaveRequests={leaveRequests}
          isDark={isDark}
        />
      </motion.div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleForm}
          className={`px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showForm ? 'Voltar à Lista' : 'Novo Funcionário'}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {showForm ? (
          <EmployeeForm onSubmit={onEmployeeSubmit} isDark={isDark} />
        ) : (
          <EmployeeList
            employees={employees}
            leaveRequests={leaveRequests}
            filters={filters}
            onFilterChange={onFilterChange}
            isDark={isDark}
          />
        )}
      </motion.div>
    </div>
  );
}