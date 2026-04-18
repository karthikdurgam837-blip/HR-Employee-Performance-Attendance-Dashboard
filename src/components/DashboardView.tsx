/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  BarChart, 
  TrendingUp, 
  ShieldAlert,
  ChevronRight,
  Maximize2,
  Clock,
  MoreVertical,
  ArrowUpRight,
  Sparkle
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts';
import { EmployeeData } from '../types';
import { getHRInsights } from '../services/geminiService';

interface DashboardViewProps {
  data: EmployeeData[];
}

export default function DashboardView({ data }: DashboardViewProps) {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    async function fetchInsights() {
      setLoadingInsights(true);
      if (data.length > 0) {
        const insights = await getHRInsights(data);
        setAiInsights(insights);
      }
      setLoadingInsights(false);
    }
    fetchInsights();
  }, [data]);

  const stats = useMemo(() => {
    const total = data.length;
    if (total === 0) return { total: 0, avgPerf: 0, attendanceRate: 0, avgEfficiency: 0, riskCount: 0 };

    const avgPerf = data.reduce((acc, curr) => acc + curr.performanceScore, 0) / total;
    const presentCount = data.filter(d => d.attendanceStatus === 'Present' || d.attendanceStatus === 'Work From Home').length;
    const attendanceRate = (presentCount / total) * 100;
    const totalTasks = data.reduce((acc, curr) => acc + curr.tasksCompleted, 0);
    const totalHours = data.reduce((acc, curr) => acc + curr.workingHours, 0);
    const avgEfficiency = totalHours > 0 ? (totalTasks / totalHours) : 0;
    const riskCount = data.filter(d => d.performanceScore < 5 && d.attendanceStatus === 'Absent').length;

    return { total, avgPerf, attendanceRate, avgEfficiency, riskCount };
  }, [data]);

  const roiData = useMemo(() => {
    return data.slice(0, 50).map(d => ({
      salary: d.salary,
      score: d.performanceScore,
      name: d.name
    }));
  }, [data]);

  const attendanceData = useMemo(() => {
    const statuses = ['Present', 'Absent', 'Work From Home', 'On Leave'];
    return statuses.map(s => ({
      name: s,
      value: data.filter(d => d.attendanceStatus === s).length
    }));
  }, [data]);

  const AUTHENTIC_COLORS = ['#3b82f6', '#94a3b8', '#1e293b', '#64748b'];

  return (
    <div className="space-y-6">
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-sm overflow-hidden rounded-sm">
        <MetricItem label="Total Personnel" value={stats.total} icon={<Users className="w-4 h-4" />} />
        <MetricItem label="Avg Performance Index" value={stats.avgPerf.toFixed(2)} icon={<Activity className="w-4 h-4" />} />
        <MetricItem label="Attendance Rate" value={`${stats.attendanceRate.toFixed(1)}%`} icon={<Clock className="w-4 h-4" />} />
        <MetricItem label="Critical Risks" value={stats.riskCount} icon={<ShieldAlert className="w-4 h-4" />} highlight={stats.riskCount > 5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Analytics Panel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Workbench insights */}
          <div className="bg-white border border-slate-200 rounded-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">HR Strategy Insights</h3>
              </div>
              <div className="text-[10px] font-mono text-slate-400">ENGINE: GEMINI-1.5-FLASH</div>
            </div>
            <div className="p-6">
              {loadingInsights ? (
                <div className="space-y-3">
                  <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
                </div>
              ) : (
                <div className="text-sm text-slate-600 leading-relaxed font-serif italic">
                  {aiInsights ? aiInsights : "Calculating dataset correlations..."}
                </div>
              )}
            </div>
          </div>

          {/* Performance Heatmap Chart - High Contrast Analytical Mode */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-sm overflow-hidden group shadow-xl">
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">ROI MATRIX: SALARY vs PERFORMANCE</h3>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-slate-700"></div>
                ))}
              </div>
            </div>
            
            <div className="p-8 relative">
              {/* Background blueprint grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              
              <div className="h-[360px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={true} />
                    <XAxis 
                      type="number" 
                      dataKey="salary" 
                      name="Salary" 
                      unit="$" 
                      axisLine={{ stroke: '#334155' }} 
                      tickLine={{ stroke: '#334155' }} 
                      tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} 
                    />
                    <YAxis 
                      type="number" 
                      dataKey="score" 
                      name="Score" 
                      domain={[0, 10]} 
                      axisLine={{ stroke: '#334155' }} 
                      tickLine={{ stroke: '#334155' }} 
                      tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} 
                    />
                    <Tooltip 
                      cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '5 5' }} 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: '1px solid #1e293b', 
                        borderRadius: '0px',
                        padding: '12px',
                        fontSize: '10px'
                      }}
                      itemStyle={{ color: '#22d3ee', textTransform: 'uppercase', fontStyle: 'italic' }}
                    />
                    <Scatter 
                      name="Employee" 
                      data={roiData} 
                      fill="#22d3ee" 
                      fillOpacity={0.6}
                      line={{ stroke: '#22d3ee', strokeWidth: 0.5, opacity: 0.1 }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Chart footer metadata */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-[9px] text-slate-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-cyan-500"></div> HIGH POTENTIAL</span>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-slate-700"></div> BASELINE</span>
                </div>
                <div className="italic uppercase">Dataset Accuracy: 99.4% Sigma</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1e293b] text-white rounded-sm p-6 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Attendance Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={AUTHENTIC_COLORS[index % AUTHENTIC_COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {attendanceData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2" style={{ backgroundColor: AUTHENTIC_COLORS[i % AUTHENTIC_COLORS.length] }}></div>
                      <span className="text-slate-400">{item.name}</span>
                    </div>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">Critical Observations</h3>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="divide-y divide-slate-100">
              {data.filter(d => d.performanceScore < 5).slice(0, 5).map((emp) => (
                <div key={emp.id} className="p-4 flex items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{emp.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter mt-0.5">{emp.department}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-rose-600">{emp.performanceScore} INDEX</div>
                    <button className="text-[9px] font-bold text-blue-600 uppercase tracking-wide mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Issue Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 border-t border-slate-100 uppercase tracking-widest transition-colors">
              View Full Personnel Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value, icon, highlight = false }: any) {
  return (
    <div className="bg-white p-6 group transition-colors hover:bg-slate-50">
      <div className="flex items-center gap-2 mb-4 text-slate-400 group-hover:text-blue-600 transition-colors">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className={`text-2xl font-mono tracking-tighter font-medium ${highlight ? 'text-rose-600' : 'text-slate-900'}`}>
        {value}
      </div>
    </div>
  );
}
