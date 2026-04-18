/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmployeeData, DEPARTMENTS, LOCATIONS, MONTHS } from '../types';

const NAMES = [
  'Arjun Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Reddy', 'Amit Singh',
  'Deepika Rao', 'Vikram Malhotra', 'Anjali Gupta', 'Rohan Das', 'Kavita Iyer',
  'Siddharth Nair', 'Megha Joshi', 'Karan Khanna', 'Ishita Mehra', 'Varun Kapoor'
];

const ROLES: Record<string, string[]> = {
  Engineering: ['Frontend Dev', 'Backend Dev', 'QA Engineer', 'DevOps'],
  Sales: ['Account Executive', 'Sales Manager', 'BDR'],
  HR: ['HR Specialist', 'Recruiter', 'HRBP'],
  Marketing: ['Growth Lead', 'SEO Expert', 'Content Strategist'],
  Finance: ['Financial Analyst', 'Accountant', 'Controller'],
  Operations: ['Ops Manager', 'Coordinator', 'Logistics']
};

export function generateHRData(rows: number = 100): EmployeeData[] {
  const data: EmployeeData[] = [];
  
  for (let i = 1; i <= rows; i++) {
    const dept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const role = ROLES[dept][Math.floor(Math.random() * ROLES[dept].length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    
    // Logic for attendance
    const rand = Math.random();
    let attendance: EmployeeData['attendanceStatus'] = 'Present';
    if (rand < 0.05) attendance = 'Absent';
    else if (rand < 0.15) attendance = 'Leave';
    else if (rand < 0.3) attendance = 'Work From Home';

    const workingHours = attendance === 'Present' || attendance === 'Work From Home' ? 8 + (Math.random() * 1) : 0;
    const overtimeHours = (attendance === 'Present' || attendance === 'Work From Home') && Math.random() > 0.7 ? Math.random() * 4 : 0;
    
    const targetTasks = 10 + Math.floor(Math.random() * 10);
    const tasksCompleted = Math.max(0, targetTasks - 2 + Math.floor(Math.random() * 5));
    const performanceScore = Math.min(10, Math.max(1, (tasksCompleted / targetTasks) * 10 + (Math.random() * 2 - 1)));

    data.push({
      id: `EMP${String(i).padStart(3, '0')}`,
      name: NAMES[i % NAMES.length],
      department: dept,
      jobRole: role,
      location: location,
      date: `2025-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      month: month,
      attendanceStatus: attendance,
      workingHours: Number(workingHours.toFixed(1)),
      overtimeHours: Number(overtimeHours.toFixed(1)),
      tasksCompleted,
      performanceScore: Number(performanceScore.toFixed(1)),
      targetTasks,
      achievementPercentage: Number(((tasksCompleted / targetTasks) * 100).toFixed(1)),
      salary: 40000 + Math.floor(Math.random() * 60000),
      yearsOfExperience: Math.floor(Math.random() * 15) + 1,
      bonusEligibility: performanceScore > 8 ? 'Yes' : 'No',
      managerRating: Math.floor(Math.random() * 5) + 1,
      remarks: performanceScore > 8 ? 'Exceptional performance' : performanceScore < 5 ? 'Needs improvement' : 'Steady progress'
    });
  }
  
  return data;
}
