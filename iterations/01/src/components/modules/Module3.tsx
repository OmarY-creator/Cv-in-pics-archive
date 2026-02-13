import React, { useState } from 'react';
import { ModuleWrapper } from '../ModuleWrapper';
import { M3_QUESTIONS } from '../../constants';
import { ProficiencyTrack } from '../../types';
import { VideoHero } from '../VideoHero';

export const Module3: React.FC<{onComplete: (s: number)=>void, track?: ProficiencyTrack}> = ({onComplete, track}) => {
  const [crisp, setCrisp] = useState({
    c: '', r: '', i: '', s: '', p: ''
  });

  const update = (key: string, val: string) => setCrisp({...crisp, [key]: val});

  const finalPrompt = `
Context: ${crisp.c || '[Missing Context]'}
Role: ${crisp.r || '[Missing Role]'}
Instruction: ${crisp.i || '[Missing Instruction]'}
Constraints: ${crisp.s || '[Missing Specs]'}
Example: ${crisp.p || '[Missing Proof]'}
  `.trim();

  return (
    <ModuleWrapper 
      title="The CRISP Framework" 
      moduleId={3} 
      onComplete={onComplete} 
      quizQuestions={M3_QUESTIONS} 
      track={track}
      hero={
        <VideoHero 
          moduleId={3}
          title="The CRISP Framework"
          subtitle="Structure Your Thoughts"
          description="Vague input equals vague output. Finley's consultants get generic templates; BrightCart's support team sounds off-brand. Structure is the difference between a toy and a tool."
          imageKeyword="architecture structure"
        />
      }
    >
      
      {/* Why This Matters */}
      <section className="mb-12">
         <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-sm">03</span>
            Context
         </h2>
         <div className="bg-white border-l-4 border-brand-orange p-6 shadow-clean rounded-r-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "A consultant asked AI to 'help with the McKinley proposal.' She got a generic template. She spent two hours rewriting it. The AI saved her zero time."
            </p>
         </div>
      </section>

      <section className="prose max-w-none">
        <h3>Structure Your Thoughts</h3>
        <p>The CRISP framework ensures you never forget a critical component.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          {[
            { k: 'c', label: 'Context', ph: 'We are launching a new coffee brand...' },
            { k: 'r', label: 'Role', ph: 'Act as a Senior Marketing Copywriter...' },
            { k: 'i', label: 'Instruction', ph: 'Write 3 taglines...' },
            { k: 's', label: 'Specs/Constraints', ph: 'Under 10 words, energetic tone...' },
            { k: 'p', label: 'Proof/Examples', ph: 'Like: "Wake up to better beans"...' },
          ].map((field) => (
            <div key={field.k} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <label className="block text-sm font-bold text-brand-blue mb-1">{field.label}</label>
              <input 
                className="w-full p-2 border-b border-gray-200 focus:border-brand-orange outline-none transition-colors"
                placeholder={field.ph}
                value={(crisp as any)[field.k]}
                onChange={(e) => update(field.k, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 text-gray-300 font-mono text-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 rounded-bl-lg text-xs font-bold text-gray-500">PREVIEW</div>
          <pre className="whitespace-pre-wrap">{finalPrompt}</pre>
        </div>
      </div>

      {/* Track-specific callout */}
      {track === 'advanced' && (
        <section className="mt-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 mb-2">Advanced: Prompt Chaining & Decomposition</h4>
            <p className="text-sm text-purple-700 mb-3">
              CRISP works for single prompts. For complex workflows, use <strong>prompt chaining</strong>: break tasks into 
              sequential steps where each prompt's output feeds the next. This reduces hallucination and improves control.
            </p>
            <p className="text-sm text-purple-700">
              Consider <strong>meta-prompting</strong>: asking the model to generate its own prompts, then executing those. 
              Tools like LangChain and DSPy formalize these patterns for production systems.
            </p>
          </div>
        </section>
      )}

      {track === 'foundation' && (
        <section className="mt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-2">Key Takeaway</h4>
            <p className="text-sm text-green-700">
              CRISP is a checklist: <strong>C</strong>ontext (background), <strong>R</strong>ole (who should the AI be), 
              <strong>I</strong>nstruction (what to do), <strong>S</strong>pecs (constraints), <strong>P</strong>roof (examples). 
              You don't need all five every time, but checking each one helps you write better prompts.
            </p>
          </div>
        </section>
      )}
    </ModuleWrapper>
  );
};