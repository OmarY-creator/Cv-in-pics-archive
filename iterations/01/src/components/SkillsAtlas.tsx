import React, { useState } from 'react';
import { Network, Database, Cpu, Layers, GitMerge, CheckCircle } from 'lucide-react';

export const SkillsAtlas: React.FC = () => {
  const [demoState, setDemoState] = useState<'input' | 'processing' | 'result'>('input');

  const rawSkills = [
    "Python (Programming Language)",
    "Python Coding",
    "Advanced Python",
    "PyTorch",
    "Data Analysis with Python"
  ];

  const processedSkill = {
    canonical: "Python",
    category: "Technical / Software Engineering",
    related: ["PyTorch", "Data Analysis", "Django"],
    confidence: "99.8%"
  };

  const runDemo = () => {
    setDemoState('processing');
    setTimeout(() => {
      setDemoState('result');
    }, 1500);
  };

  const resetDemo = () => {
    setDemoState('input');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-12 shadow-clean-lg mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 bg-brand-black text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl">
              <Network size={40} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider rounded-full">Workforce Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-black tracking-tight">Skills Atlas</h1>
              <h2 className="text-xl text-gray-500 font-medium mb-6">AI-Assisted Skills Harmonisation Engine</h2>
              <p className="text-gray-600 leading-relaxed text-lg max-w-2xl">
                Skills Atlas solves the "messy data" problem in L&D. It uses a 15-dimensional vector analysis to deduplicate, categorize, and map skills to business value, creating a clean source of truth for workforce planning.
              </p>
            </div>
          </div>
        </div>

        {/* 15-Dimensional Framework Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           <div className="bg-white p-8 rounded-3xl shadow-clean border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-brand-blue" />
                <h3 className="text-xl font-bold">The 15-Dimensional Framework</h3>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Most tools match keywords. Skills Atlas analyzes 15 semantic dimensions to understand the "DNA" of a skill.
              </p>
              
              <div className="relative h-64 flex items-center justify-center">
                 {/* Visual abstraction of dimensions */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow"></div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 text-center">
                    {['Context', 'Tools', 'Outcome', 'Level', 'Domain', 'Action', 'Industry', 'Risk', 'Soft/Hard'].map((dim, i) => (
                      <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-mono font-bold text-gray-600 border border-gray-100 hover:bg-brand-blue hover:text-white transition-colors cursor-default">
                        {dim}
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-brand-blue opacity-10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-brand-orange" />
                  <h3 className="text-xl font-bold">Data Foundation</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                    <div>
                      <span className="font-bold block text-sm">ESCO & O*NET Aligned</span>
                      <span className="text-xs text-gray-400">Built on European and US standard taxonomies.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                    <div>
                      <span className="font-bold block text-sm">Vector Embeddings</span>
                      <span className="text-xs text-gray-400">Uses High-dimensional space to find semantic neighbors.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                    <div>
                      <span className="font-bold block text-sm">Real-Time Deduplication</span>
                      <span className="text-xs text-gray-400">Merges "PyTorch" and "Python (PyTorch library)" automatically.</span>
                    </div>
                  </li>
                </ul>
              </div>
           </div>
        </div>

        {/* Deduplication Demo */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-clean-lg border border-gray-100">
           <div className="p-8 border-b border-gray-100 bg-gray-50/50">
             <h3 className="text-xl font-bold flex items-center gap-2">
               <GitMerge className="text-brand-black" />
               Interactive Deduplication Engine
             </h3>
             <p className="text-sm text-gray-500 mt-2">Simulate how the system cleans messy intake data.</p>
           </div>

           <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Input Column */}
              <div className={`transition-opacity duration-500 ${demoState === 'input' ? 'opacity-100' : 'opacity-50'}`}>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Raw Input Data</h4>
                 <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-2">
                    {rawSkills.map((s, i) => (
                      <div key={i} className="bg-white p-2 rounded text-sm text-red-800 border border-red-100 shadow-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        {s}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col items-center justify-center">
                 {demoState === 'input' && (
                   <button 
                    onClick={runDemo}
                    className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                   >
                     <Cpu />
                   </button>
                 )}
                 {demoState === 'processing' && (
                    <div className="flex flex-col items-center gap-3">
                       <div className="w-16 h-16 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
                       <span className="text-xs font-bold text-brand-blue animate-pulse">ANALYZING VECTORS...</span>
                    </div>
                 )}
                 {demoState === 'result' && (
                   <button 
                    onClick={resetDemo}
                    className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                   >
                     <CheckCircle />
                   </button>
                 )}
              </div>

              {/* Result Column */}
              <div className={`transition-all duration-500 transform ${demoState === 'result' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Harmonised Output</h4>
                 <div className="bg-green-50 border border-green-100 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-200 px-2 py-1 rounded-bl text-[10px] font-bold text-green-800">
                      ID: SK_88291
                    </div>
                    <div className="text-2xl font-bold text-green-900 mb-1">{processedSkill.canonical}</div>
                    <div className="text-xs font-mono text-green-700 mb-4">{processedSkill.category}</div>
                    
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase text-green-600/70">Mapped Aliases</div>
                      <div className="flex flex-wrap gap-1">
                         {processedSkill.related.map(r => (
                           <span key={r} className="px-1.5 py-0.5 bg-white rounded text-[10px] text-green-800 border border-green-200">{r}</span>
                         ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-green-200 flex justify-between items-center">
                       <span className="text-xs font-bold text-green-800">Confidence Score</span>
                       <span className="text-sm font-mono font-bold text-brand-black">{processedSkill.confidence}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};