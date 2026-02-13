import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PortfolioHomeProps {
  onNavigate: (page: string) => void;
}

export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-gray-50 min-h-screen pt-12">
      
      {/* --- SELECTED WORKS --- */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-brand-black mb-4">Selected Works</h2>
              <div className="w-20 h-1 bg-brand-black"></div>
              <p className="mt-4 text-gray-600 max-w-xl">
                A collection of projects operating at the intersection of human development, data architecture, and artificial intelligence.
              </p>
            </div>
            <span className="text-gray-400 font-mono text-sm hidden md:inline-block">2023 — PRESENT</span>
          </div>

          <div className="grid grid-cols-1 gap-12">
            
            {/* PROJECT 1: AI TEACHER */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-clean hover:shadow-clean-lg transition-all duration-300 flex flex-col md:flex-row h-auto md:h-[400px]">
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider rounded-full">Educational Platform</span>
                   <span className="text-gray-400 text-xs">React • Gemini API • Tailwind</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-brand-black group-hover:text-brand-blue transition-colors">AI Teacher</h3>
                <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
                  An adaptive learning system that demystifies Large Language Models using interactive psychology-backed modules. Features real-time API integration and personalized curriculum generation.
                </p>
                <button 
                  onClick={() => onNavigate('ai-teacher')}
                  className="flex items-center gap-2 text-brand-black font-bold border-b-2 border-brand-black w-fit pb-1 hover:text-brand-blue hover:border-brand-blue transition-colors"
                >
                  Launch Project <ArrowRight size={18} />
                </button>
              </div>
              <div className="flex-1 bg-gray-100 relative order-1 md:order-2 overflow-hidden">
                {/* Abstract UI representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[80%] h-[80%] bg-white rounded-tl-2xl shadow-2xl transform translate-x-12 translate-y-12 border border-gray-200 p-6">
                      <div className="w-full h-8 bg-gray-50 rounded mb-4 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-32 bg-brand-blue/5 rounded w-full border border-brand-blue/20 mt-6 flex items-center justify-center text-brand-blue font-mono text-xs">
                          <span className="animate-pulse">Analyzing Tokens...</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* PROJECT 2: SKILLS ATLAS */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-clean hover:shadow-clean-lg transition-all duration-300 flex flex-col md:flex-row h-auto md:h-[400px]">
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center order-2 md:order-1">
                 <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">Data Visualization</span>
                   <span className="text-gray-400 text-xs">D3.js • Python • Analytics</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-brand-black group-hover:text-brand-blue transition-colors">Skills Atlas</h3>
                <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
                  Mapping the future of work through interactive data visualization. A comprehensive tool to analyze skill gaps and workforce readiness in the age of automation.
                </p>
                <button 
                  onClick={() => onNavigate('skills-atlas')}
                  className="flex items-center gap-2 text-brand-black font-bold border-b-2 border-brand-black w-fit pb-1 hover:text-brand-blue hover:border-brand-blue transition-colors"
                >
                  View Case Study <ArrowRight size={18} />
                </button>
              </div>
              <div className="flex-1 bg-brand-black relative order-1 md:order-2 overflow-hidden text-white">
                 <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[300px] h-[300px] border border-white/20 rounded-full flex items-center justify-center relative">
                       <div className="absolute w-[200px] h-[200px] border border-white/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                       <div className="absolute w-4 h-4 bg-brand-blue rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 shadow-[0_0_20px_#2563EB]"></div>
                       <div className="font-mono text-xs tracking-widest text-brand-blue">ATLAS_V1</div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};