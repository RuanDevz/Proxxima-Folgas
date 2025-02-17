import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import { EmployeesPage } from './pages/EmployeesPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetailsPage';
import { CalendarPage } from './pages/CalendarPage';
import type { Employee, LeaveRequest, Filters } from './types';
import { sampleEmployees, sampleLeaveRequests } from './data/sampleData';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(sampleLeaveRequests);
  const [filters, setFilters] = useState<Filters>({
    gender: 'all',
    leaveType: 'all',
    searchTerm: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleEmployeeSubmit = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: crypto.randomUUID(),
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleLeaveRequestSubmit = (requestData: Omit<LeaveRequest, 'id' | 'status'>) => {
    const newRequest: LeaveRequest = {
      ...requestData,
      id: crypto.randomUUID(),
      status: 'pending',
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setShowForm(false);
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors`}>
        <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Proxxima - Calendários de Folgas
                </h1>
              </div>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Navigation isDark={isDark} />
          
          <Routes>
            <Route path="/" element={<Navigate to="/employees" replace />} />
            <Route
              path="/employees"
              element={
                <EmployeesPage
                  employees={employees}
                  leaveRequests={leaveRequests}
                  filters={filters}
                  onFilterChange={setFilters}
                  onEmployeeSubmit={handleEmployeeSubmit}
                  isDark={isDark}
                  showForm={showForm}
                  onToggleForm={() => setShowForm(!showForm)}
                />
              }
            />
            <Route
              path="/employees/:id"
              element={
                <EmployeeDetailsPage
                  employees={employees}
                  leaveRequests={leaveRequests}
                  isDark={isDark}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <CalendarPage
                  employees={employees}
                  leaveRequests={leaveRequests}
                  onLeaveRequestSubmit={handleLeaveRequestSubmit}
                  isDark={isDark}
                  showForm={showForm}
                  onToggleForm={() => setShowForm(!showForm)}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;