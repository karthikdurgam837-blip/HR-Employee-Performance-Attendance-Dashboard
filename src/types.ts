/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EmployeeData {
  id: string;
  name: string;
  department: string;
  jobRole: string;
  location: string;
  date: string;
  month: string;
  attendanceStatus: 'Present' | 'Absent' | 'Leave' | 'Work From Home';
  workingHours: number;
  overtimeHours: number;
  tasksCompleted: number;
  performanceScore: number;
  targetTasks: number;
  achievementPercentage: number;
  salary: number;
  yearsOfExperience: number;
  bonusEligibility: 'Yes' | 'No';
  managerRating: number;
  remarks: string;
}

export const DEPARTMENTS = ['Sales', 'Engineering', 'HR', 'Marketing', 'Finance', 'Operations'];
export const LOCATIONS = ['New York', 'London', 'Bangalore', 'Singapore', 'Berlin'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June'];
