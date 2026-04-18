/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Share2, 
  Download,
  Search,
  Menu,
  X,
  Database,
  Layout,
  ChevronRight,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateHRData } from './utils/dataGenerator';
import { DEPARTMENTS, LOCATIONS, MONTHS } from './types';
import DashboardView from './components/DashboardView';
import GuideView from './components/GuideView';
import PortfolioView from './components/PortfolioView';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'portfolio'>('dashboard');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const rawData = useMemo(() => generateHRData(100), []);

  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      return (selectedDept === 'All' || item.department === selectedDept) &&
             (selectedLocation === 'All' || item.location === selectedLocation) &&
             (selectedMonth === 'All' || item.month === selectedMonth);
    });
  }, [rawData, selectedDept, selectedLocation, selectedMonth]);

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans text-slate-900 border-t-4 border-blue-600">
      
      {/* Structural Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0 }}
        className="bg-white flex-shrink-0 relative overflow-hidden hidden md:flex flex-col border-r border-slate-200"
      >
        <div className="p-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-sm">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-sm uppercase tracking-widest text-slate-900">HR Workbench</h1>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-8 overflow-y-auto pt-2">
          <nav className="space-y-1">
            <SidebarBtn 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              icon={<Layout className="w-4 h-4" />}
              label="Personnel Analytics"
            />
            <SidebarBtn 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')}
              icon={<BookOpen className="w-4 h-4" />}
              label="Technical Guide"
            />
            <SidebarBtn 
              active={activeTab === 'portfolio'} 
              onClick={() => setActiveTab('portfolio')}
              icon={<Share2 className="w-4 h-4" />}
              label="Export Center"
            />
          </nav>

          {activeTab === 'dashboard' && (
            <div className="space-y-8 pt-8">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 font-mono">Dataset parameters</div>
              
              <div className="space-y-4">
                <FilterSelect label="Department" value={selectedDept} onChange={setSelectedDept} options={DEPARTMENTS} />
                <FilterSelect label="Presence" value={selectedLocation} onChange={setSelectedLocation} options={LOCATIONS} />
                <FilterSelect label="Reporting Period" value={selectedMonth} onChange={setSelectedMonth} options={MONTHS} />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-300 shadow-inner italic font-serif">
              HR
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Root Admin</div>
              <div className="text-[9px] text-slate-400 font-mono">OPERATOR_ID: 837</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Workbench Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-sm text-slate-400 transition-all active:scale-95"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Main System</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900">{activeTab}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-hover:text-slate-400" />
              <input 
                type="text" 
                placeholder="Search raw IDs..." 
                className="bg-slate-50 border border-slate-200 rounded-sm py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 lg:w-64 transition-all hover:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-sm leading-none">
                <Bell className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-sm text-xs font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95">
                <Download className="w-3.5 h-3.5" />
                <span>Sync Data</span>
              </button>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === 'dashboard' && <DashboardView data={filteredData} />}
              {activeTab === 'guide' && <GuideView />}
              {activeTab === 'portfolio' && <PortfolioView />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

function SidebarBtn({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-sm transition-all text-xs font-bold uppercase tracking-wider",
        active 
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      )}
    >
      <div className={cn(
        "transition-colors",
        active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
      )}>
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function FilterSelect({ label, value, onChange, options }: any) {
  return (
    <div className="px-2">
      <label className="text-[9px] font-bold text-slate-400 block mb-2 uppercase tracking-widest">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 text-[11px] font-bold text-slate-700 focus:ring-1 focus:ring-blue-500/20 focus:outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all"
      >
        <option value="All">All {label}s</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
