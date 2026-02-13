import React from 'react';
import { AppState } from '../types';
import { Lock, Check, Trophy, ArrowLeft } from 'lucide-react';
import { AICoach } from './AICoach';

interface LayoutProps {
  appState: AppState;
  children: React.ReactNode;
  onExit: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ appState, children, onExit }) => {
  const keys = appState.unlockedKeys;

  return (
    <div className="min-h-screen bg-brand-gray text-brand-black relative flex flex-col">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onExit}
              className="text-gray-400 hover:text-brand-black transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Works</span>
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-black text-white rounded-lg flex items-center justify-center font-bold text-lg font-serif">
                Ai
              </div>
              <span className="font-semibold tracking-tight text-brand-black hidden sm:inline">Teacher</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
             {appState.view === 'learning' && (
                <div className="text-xs font-medium tracking-widest text-gray-500 uppercase hidden sm:block">
                  Module {appState.currentModuleId} <span className="text-gray-300 mx-2">/</span> 5
                </div>
             )}
             
             {/* Key Visualization - Minimal Dots */}
             <div className="flex gap-2">
               {keys.map((isUnlocked, idx) => (
                 <div 
                   key={idx}
                   className={`transition-all duration-700 ease-out border rounded-full flex items-center justify-center
                     ${isUnlocked 
                       ? 'w-8 h-8 bg-brand-black border-brand-black text-white' 
                       : 'w-8 h-8 bg-white border-gray-200 text-gray-300'
                     }`}
                 >
                   {isUnlocked ? <Check size={12} strokeWidth={3} /> : <Lock size={12} />}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <AICoach />
    </div>
  );
};