/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Database,
  ExternalLink,
  Code,
  FileText,
  Share2
} from 'lucide-react';
import { useState } from 'react';

export default function PortfolioView() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const githubReadme = `# HR Personnel Analytics Workbench

A production-grade HR analytics dashboard built with React, TypeScript, and Gemini AI for strategic personnel management and performance correlation.

## Executive Summary
This project implements a technical workbench for HR Analysts to monitor employee productivity, attendance behavior, and salary-to-performance ROI. It leverages LLM instrumentation to provide automated qualitative insights from quantitative datasets.

## Core Module Specifications
- **Dashboard Engine:** Real-time data synthesis across Department and Location slices.
- **ROI Analytics:** Correlation mapping of Base Salary versus Performance Scores.
- **Support Triggering:** Automated flagging of critical personnel risks based on statistical anomalies.
- **AI Analytics Module:** Deep integration with @google/genai for organizational health reporting.

## Technical Stack
- **Framework:** React 18 / TypeScript
- **State/Logic:** Custom React Hooks for Memoized Data Synthesis
- **Visualization:** Recharts (SVG-based charting)
- **Styling:** PostCSS / Tailwind CSS (Structural approach)

---
*Technical Implementation by Personnel Analyst Module.*`;

  const linkedinPost = `Proud to showcase my latest technical project: The HR Personnel Analytics Workbench.

Bridging the gap between raw personnel data and strategic decision-making. 

Highlights:
- Statistical ROI Mapping: Correlating capital expenditure with employee performance.
- Automated Risk Detection: Using data anomalies to trigger management interventions.
- AI instrumentation: Leveraging Gemini to generate organizational health reports.

Built with a focus on data integrity, structural design, and technical precision.

#DataScience #HumanResources #ReactJS #TypeScript #AIEngineering #HRAnalytics`;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Structural Header */}
      <div className="border-l-4 border-slate-900 pl-8 space-y-4 py-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic font-serif">Project Export Protocol</h2>
        <p className="text-slate-500 font-medium max-w-3xl leading-relaxed">
          Standard documentation and communication assets have been generated. The <strong>README.md</strong> is ready in your project root for direct GitHub publication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Repo Documentation */}
        <section className="bg-white border border-slate-200 rounded-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-sm">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">README.md Specification</h3>
            </div>
            <button 
              onClick={() => copyToClipboard(githubReadme, 'github')}
              className="p-2 border border-slate-200 hover:bg-slate-50 transition-colors rounded-sm text-slate-400 hover:text-slate-900"
            >
              {copied === 'github' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-8">
            <div className="bg-slate-50 border border-slate-100 rounded-sm p-6 overflow-y-auto h-[350px] font-mono text-[11px] text-slate-500 shadow-inner">
              <pre className="whitespace-pre-wrap">{githubReadme}</pre>
            </div>
          </div>
        </section>

        {/* Distribution Module */}
        <section className="bg-white border border-slate-200 rounded-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#0077b5] p-2 rounded-sm">
                <Linkedin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">Professional Distribution</h3>
            </div>
            <button 
              onClick={() => copyToClipboard(linkedinPost, 'linkedin')}
              className="p-2 border border-slate-200 hover:bg-slate-50 transition-colors rounded-sm text-slate-400 hover:text-slate-900"
            >
              {copied === 'linkedin' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-8 space-y-8">
            <div className="text-xs text-slate-600 font-medium italic border-l-2 border-slate-200 pl-4 py-2">
              {linkedinPost.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
            </div>

            <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <FileText className="w-4 h-4" /> Recommended Visual Assets
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                [IMG_01]: ROI Correlation Matrix Chart<br/>
                [IMG_02]: KPI Overview Workbench Header<br/>
                [IMG_03]: Automation Insights Panel Log
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="bg-blue-600 p-8 rounded-sm text-white flex items-center justify-between shadow-lg shadow-blue-600/20">
        <div className="space-y-1">
          <h4 className="text-sm font-bold uppercase tracking-widest">Ready for deployment</h4>
          <p className="text-xs text-blue-100 italic">Project assets verified and ready for professional distribution.</p>
        </div>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-sm text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 uppercase tracking-widest">
          Share Project <Share2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
