import React, { useState } from 'react';
import { ModuleWrapper } from '../ModuleWrapper';
import { M1_QUESTIONS } from '../../constants';
import { Calculator, Cpu, Coins, Building2, ShoppingCart } from 'lucide-react';
import { ProficiencyTrack } from '../../types';
import { VideoHero } from '../VideoHero';

export const Module1: React.FC<{onComplete: (s: number)=>void, track?: ProficiencyTrack}> = ({onComplete, track}) => {
  const [text, setText] = useState('');
  const [activeCase, setActiveCase] = useState<'finley' | 'brightcart' | null>(null);

  // Approximation
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const tokenCount = Math.ceil(charCount / 4); 
  const cost = (tokenCount / 1000) * 0.002;

  const loadCase = (c: 'finley' | 'brightcart') => {
    setActiveCase(c);
    if (c === 'finley') {
      setText(`[CONFIDENTIAL CLIENT PROPOSAL - DRAFT v4]
      
EXECUTIVE SUMMARY
We propose a comprehensive restructuring of the compliance framework...
(Imagine 50 more pages of dense legal text here)
...
REGULATORY CITATIONS:
1. EU GDPR Art 5(1)
2. UK Data Protection Act 2018
...
(The sheer volume of this document risks exceeding the context window, causing the model to "forget" the initial instructions about tone and formatting.)`);
    } else {
      setText(`Product: Ultra-Soft Merino Wool Socks
Target Audience: Hikers
Tone: Energetic

Description:
Experience the ultimate comfort on the trails with our Merino Wool socks. Breathable, durable, and itch-free.`);
    }
  };

  return (
    <ModuleWrapper 
      title="How AI Works" 
      moduleId={1} 
      onComplete={onComplete} 
      quizQuestions={M1_QUESTIONS} 
      track={track}
      hero={
        <VideoHero 
          moduleId={1}
          title="How AI Actually Works"
          subtitle="The Prediction Engine"
          description="Finley & Co faces a hallucination crisis. BrightCart is losing customers to a chatbot. See why these failures happened—and how to prevent them."
          imageKeyword="artificial intelligence"
        />
      }
    >
      
      {/* 1.1 Why This Matters (Text Version - Supplemental) */}
      <section className="mb-12">
         <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-sm">01</span>
            Context
         </h2>
         <div className="bg-white border-l-4 border-brand-orange p-6 shadow-clean rounded-r-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "Last month, a consultant at <strong>Finley & Co</strong> uploaded a 50-page client proposal to an AI model to summarize. The model 'hallucinated' a regulation that didn't exist because the document was too long for its memory. The client caught the error."
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Understanding "Tokens" isn't just technical—it's about knowing the cost and capacity limits of your tools.
            </p>
         </div>
      </section>

      {/* Concept Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-brand-black">The Prediction Engine</h3>
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          AI models don't "know" things like we do. They are massive statistical engines that predict the next piece of text based on what came before.
        </p>
        <div className="bg-blue-50 p-6 rounded-xl">
          <p className="text-brand-dark font-medium">
            <span className="text-brand-blue font-bold uppercase tracking-wide text-xs block mb-1">Key Concept</span>
            We measure this text in "Tokens". Roughly speaking, 1,000 tokens is about 750 words.
          </p>
        </div>
      </section>

      {/* Interactive: Token Calculator */}
      <section>
        <div className="bg-white rounded-2xl shadow-clean-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-gray">
            <div className="flex items-center gap-2 text-brand-black">
              <Cpu size={18} />
              <span className="font-semibold text-sm tracking-wide uppercase">Token Calculator</span>
            </div>
            
            {/* Case Study Toggles */}
            <div className="flex gap-2">
               <button
                type="button"
                onClick={() => loadCase('finley')}
                className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors ${activeCase === 'finley' ? 'bg-brand-black text-white' : 'bg-white border hover:bg-gray-50'}`}
               >
                 <Building2 size={12} /> Finley (Corp)
               </button>
               <button
                type="button"
                onClick={() => loadCase('brightcart')}
                className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors ${activeCase === 'brightcart' ? 'bg-brand-black text-white' : 'bg-white border hover:bg-gray-50'}`}
               >
                 <ShoppingCart size={12} /> BrightCart (Retail)
               </button>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="relative mb-8">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your prompt here, or select a case study above..."
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none resize-none transition-all font-mono text-sm leading-relaxed text-brand-black placeholder-gray-400"
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
                {charCount} chars
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                  <Calculator size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Tokens</div>
                  <div className="text-2xl font-bold text-brand-black">{tokenCount}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  <span className="font-serif font-bold italic">W</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Words</div>
                  <div className="text-2xl font-bold text-brand-black">{wordCount}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Coins size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Est. Cost</div>
                  <div className="text-2xl font-bold text-brand-black font-mono">${cost.toFixed(4)}</div>
                </div>
              </div>
            </div>

            {tokenCount > 100 && (
               <div className="mt-6 p-4 rounded-xl bg-orange-50 text-orange-800 text-sm flex items-start gap-3 animate-fade-in">
                 <div className="w-1 h-full bg-orange-400 rounded-full shrink-0"></div>
                 <div>
                   <strong className="block mb-1">Capacity Insight:</strong> 
                   {activeCase === 'finley' 
                     ? "Heavy legal documents consume context window quickly. This increases the risk of the model forgetting earlier instructions."
                     : "Short descriptions are cheap and fast. You could generate 100 variations of this for the price of one legal document."
                   }
                 </div>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Track-specific callout */}
      {track === 'advanced' && (
        <section className="mt-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 mb-2">Advanced: Tokenization Deep Dive</h4>
            <p className="text-sm text-purple-700 mb-3">
              Different models use different tokenizers. GPT-4 uses <strong>cl100k_base</strong> (~100k vocabulary), 
              while Claude uses a custom BPE tokenizer. This means the same text can have different token counts across models.
            </p>
            <p className="text-sm text-purple-700">
              For precise cost estimation, use the provider's official tokenizer library (e.g., <code className="bg-purple-100 px-1 rounded">tiktoken</code> for OpenAI). 
              Context window management becomes critical when building RAG systems or multi-turn agents.
            </p>
          </div>
        </section>
      )}

      {track === 'foundation' && (
        <section className="mt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-2">Key Takeaway</h4>
            <p className="text-sm text-green-700">
              Think of tokens like a budget. Longer inputs cost more and use up the model's "memory." 
              When your document is too long, the AI might forget your instructions or make things up. 
              Keep prompts focused and concise when possible.
            </p>
          </div>
        </section>
      )}
    </ModuleWrapper>
  );
};