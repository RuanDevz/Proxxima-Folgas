import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        isDark 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
      aria-label="Alternar tema"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}