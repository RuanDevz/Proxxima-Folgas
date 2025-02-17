export interface Employee {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  hireDate: string;
  department: string;
  role: string;
  avatar?: string;
  phone: string;
  address: string;
  birthDate: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'dayoff' | 'maternity' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface WeekPeriod {
  weekNumber: number;
  startDate: string;
  endDate: string;
}

export interface Filters {
  gender: 'all' | 'male' | 'female';
  leaveType: 'all' | 'vacation' | 'dayoff' | 'maternity' | 'other';
  searchTerm: string;
}

export interface Theme {
  isDark: boolean;
}