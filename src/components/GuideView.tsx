/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  FileSpreadsheet, 
  Settings, 
  BarChart3, 
  Search,
  BookOpen, 
  Lightbulb,
  CheckCircle2,
  ListOrdered,
  Zap,
  Info,
  Database
} from 'lucide-react';

export default function GuideView() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Structural Header */}
      <div className="border-l-4 border-blue-600 pl-8 space-y-4 py-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic font-serif">Implementation Manual</h2>
        <p className="text-slate-500 font-medium max-w-3xl leading-relaxed">
          Standard Operating Procedure for replicating the HR Workbench analytics system within Microsoft Excel environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Step 1: Data Architecture */}
        <section className="bg-white border border-slate-200 rounded-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">01. Data Architecture</h3>
            <Database className="w-4 h-4 text-slate-300" />
          </div>
          <div className="p-8 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              Normalization of raw employee tables is critical for scaling analytics.
            </p>
            <table className="w-full text-left text-[10px] font-mono">
              <thead className="bg-slate-50 text-slate-400">
                <tr>
                  <th className="p-2 border border-slate-100 uppercase">Field</th>
                  <th className="p-2 border border-slate-100 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr><td className="p-2 border border-slate-100">Personnel_ID</td><td className="p-2 border border-slate-100">Primary Key</td></tr>
                <tr><td className="p-2 border border-slate-100">Performance_Score</td><td className="p-2 border border-slate-100">Int (0-10)</td></tr>
                <tr><td className="p-2 border border-slate-100">Attend_Status</td><td className="p-2 border border-slate-100">Enum</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 2: Calculation Engine */}
        <section className="bg-white border border-slate-200 rounded-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">02. Calculation Engine</h3>
            <Zap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="p-8 space-y-6">
            <FormulaDefinition 
              title="KPI: Efficiency" 
              formula="=[@TasksCompleted] / [@WorkingHours]" 
              logic="Calculates raw output per unit of labor."
            />
            <FormulaDefinition 
              title="KPI: ROI Index" 
              formula="=[@PerfScore] / [@BaseSalary]" 
              logic="Normalizes performance against capital expenditure."
            />
          </div>
        </section>

        {/* Step 3: Pivot Mapping */}
        <section className="bg-white border border-slate-200 rounded-sm md:col-span-2">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
            <span>03. Pivot Mapping & Slicer Integration</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">A. Visual Hierarchy</h4>
              <p className="text-xs text-slate-600 italic">Primary: Dept Perf (Bar). Secondary: Attendance (Donut).</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">B. Interactive Rails</h4>
              <p className="text-xs text-slate-600 italic">Insert Slicers for Dept, Location, and Timeline.</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">C. Data Refresh</h4>
              <p className="text-xs text-slate-600 italic">Ensure 'Refresh on Open' is enabled in Pivot options.</p>
            </div>
          </div>
        </section>

      </div>

      {/* Advisory Note */}
      <div className="bg-slate-900 p-8 rounded-sm text-white flex items-start gap-6 relative overflow-hidden group hover:bg-slate-800 transition-colors">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 bg-white rounded-full"></div>
        <div className="bg-blue-600 p-3 rounded-sm relative z-10">
          <Info className="w-5 h-5" />
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-2 italic font-serif">Analyst Advisory</h4>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Automated Excel tools serve as baseline infrastructure. High-level HR decisions should always correlate statistical anomalies with qualitative human performance reviews to avoid data-bias in personnel management.
          </p>
        </div>
      </div>

    </div>
  );
}

function FormulaDefinition({ title, formula, logic }: any) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{title}</div>
      <div className="bg-slate-50 p-3 border border-slate-100 text-[10px] font-mono text-slate-600">
        {formula}
      </div>
      <div className="text-[9px] text-slate-400 italic">{logic}</div>
    </div>
  );
}
