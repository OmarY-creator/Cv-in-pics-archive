import React, { useState } from 'react';
import { UserProfile, UserUseCase, UserWorkStyle, UserRiskTolerance } from '../types';
import { ArrowRight, Code, PenTool, BarChart3, Search, MessageSquare, Info } from 'lucide-react';

interface IntakeFormProps {
  onComplete: (profile: Partial<UserProfile>) => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [useCase, setUseCase] = useState<UserUseCase>('writing');
  const [workStyle, setWorkStyle] = useState<UserWorkStyle>('balanced');
  const [risk, setRisk] = useState<UserRiskTolerance>('moderate');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onComplete({
      name,
      primaryUseCase: useCase,
      workStyle,
      riskTolerance: risk
    });
  };

  const useCaseIcons = {
    writing: PenTool,
    analysis: BarChart3,
    coding: Code,
    research: Search,
    customer_service: MessageSquare
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white text-brand-black p-6">
      <div className="w-full max-w-3xl animate-fade-in-up">
        
        <div className="text-center mb-12">
           <div className="inline-block px-3 py-1 bg-brand-black text-white text-xs font-bold uppercase tracking-widest mb-4">Project: AI Teacher</div>
           <h2 className="text-3xl font-light text-gray-800">
            Design Your Profile
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Tell us about <strong>your actual job</strong>. We use this to customize the case studies and generate your final System Prompt.
          </p>
        </div>

        <div className="space-y-12 bg-white md:p-8 rounded-2xl">
          
          {/* 1. Name Input */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">01 / Identification</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-4 bg-transparent border-b-2 border-gray-200 text-3xl md:text-4xl font-light text-brand-black focus:border-brand-black outline-none transition-colors placeholder-gray-200"
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          {/* 2. Primary Use Case */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">02 / Your Goal</label>
               <span className="text-[10px] text-gray-400 flex items-center gap-1"><Info size={10}/> What do you want to use AI for at work?</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(['writing', 'analysis', 'coding', 'research', 'customer_service'] as UserUseCase[]).map((opt) => {
                const Icon = useCaseIcons[opt];
                const isSelected = useCase === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setUseCase(opt)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                      isSelected
                        ? 'border-brand-black bg-brand-black text-white shadow-xl'
                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wide">{opt.replace('_', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Style & Risk (Split) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Work Style */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">03 / Your Work Style</label>
              <p className="text-xs text-gray-400 mb-2">How do you prefer AI to output content?</p>
              <div className="flex flex-col gap-2">
                {([
                  { val: 'structured', label: 'Structured & Formal' },
                  { val: 'balanced', label: 'Balanced' },
                  { val: 'flexible', label: 'Flexible & Creative' }
                ] as const).map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setWorkStyle(item.val as UserWorkStyle)}
                    className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-200 ${
                      workStyle === item.val
                        ? 'border-brand-black text-brand-black font-medium pl-6 bg-gray-50'
                        : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:pl-5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Tolerance */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">04 / Risk Profile</label>
              <p className="text-xs text-gray-400 mb-2">How strict should safety guardrails be?</p>
              <div className="flex flex-col gap-2">
                 {([
                  { val: 'cautious', label: 'Cautious (Zero Risk)' },
                  { val: 'moderate', label: 'Moderate (Standard)' },
                  { val: 'experimental', label: 'Experimental (Low Guardrails)' }
                ] as const).map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setRisk(item.val as UserRiskTolerance)}
                    className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-200 ${
                      risk === item.val
                        ? 'border-brand-black text-brand-black font-medium pl-6 bg-gray-50'
                        : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:pl-5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="pt-8">
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="group w-full bg-brand-black text-white h-16 rounded-none font-medium text-lg flex items-center justify-between px-8 hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Initialize System</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};