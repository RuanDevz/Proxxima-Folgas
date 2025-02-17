import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  isDark: boolean;
}

export function DatePicker({ value, onChange, isDark }: DatePickerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CalendarIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
          isDark
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-600'
        } focus:ring-2 focus:ring-offset-2 ${
          isDark ? 'focus:ring-blue-500' : 'focus:ring-blue-600'
        } transition-colors`}
      />
    </div>
  );
}