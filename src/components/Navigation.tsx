import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isDark: boolean;
}

export function Navigation({ isDark }: NavigationProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`flex space-x-4 mb-6 ${isDark ? 'text-white' : 'text-gray-600'}`}>
      <Link
        to="/employees"
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isActive('/employees')
            ? isDark
              ? 'bg-gray-700 text-blue-400'
              : 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Users className="w-5 h-5 mr-2" />
        Funcionários
      </Link>
      <Link
        to="/calendar"
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isActive('/calendar')
            ? isDark
              ? 'bg-gray-700 text-blue-400'
              : 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Calendar className="w-5 h-5 mr-2" />
        Calendário de Folgas
      </Link>
    </nav>
  );
}