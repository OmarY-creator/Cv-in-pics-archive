import React, { useState } from 'react';
import { ModuleWrapper } from '../ModuleWrapper';
import { M2_QUESTIONS } from '../../constants';
import { Flame, Snowflake, Sparkles, Building2, ShoppingCart } from 'lucide-react';
import { ProficiencyTrack } from '../../types';
import { VideoHero } from '../VideoHero';

export const Module2: React.FC<{onComplete: (s: number)=>void, track?: ProficiencyTrack}> = ({onComplete, track}) => {
  const [temp, setTemp] = useState(0.5);
  const [mode, setMode] = useState<'finley' | 'brightcart' | 'neutral'>('neutral');

  const getOutput = (t: number) => {
    // Finley Mode content
    if (mode === 'finley') {
        if (t < 0.3) return {
            type: 'SAFE (COMPLIANT)',
            desc: 'Ideal for Legal/Compliance',
            text: "Pursuant to Article 5 of the GDPR, personal data must be processed lawfully, fairly, and in a transparent manner. Non-compliance may result in fines.",
            borderColor: 'border-brand-blue',
            icon: Snowflake
        };
        if (t < 0.7) return {
            type: 'BALANCED',
            desc: 'Standard Business Writing',
            text: "GDPR Article 5 requires that we process data lawfully and transparently. We should ensure our systems are updated to reflect these standards.",
            borderColor: 'border-purple-500',
            icon: Sparkles
        };
        return {
            type: 'RISKY (HALLUCINATION)',
            desc: 'Unsafe for Compliance',
            text: "The GDPR suggests we should be pretty open with data. Article 5 is mostly about vibes and making sure customers feel good about their privacy.",
            borderColor: 'border-brand-orange',
            icon: Flame
        };
    }

    // BrightCart Mode content
    if (mode === 'brightcart') {
        if (t < 0.3) return {
            type: 'BORING',
            desc: 'Too rigid for marketing',
            text: "This is a pair of socks. They are made of wool. They are blue. Buy them for $10.",
            borderColor: 'border-brand-blue',
            icon: Snowflake
        };
        if (t < 0.7) return {
            type: 'BALANCED',
            desc: 'Good Marketing Copy',
            text: "Step into comfort with our Merino Wool socks. Designed for the trail, built for durability.",
            borderColor: 'border-purple-500',
            icon: Sparkles
        };
        return {
            type: 'CREATIVE',
            desc: 'Viral/Unique',
            text: "Feet? Happy. Trail? Conquered. These aren't just socks, they're a hug for your toes on the road to glory.",
            borderColor: 'border-brand-orange',
            icon: Flame
        };
    }

    // Default
    if (t < 0.4) return {
      type: 'FACTUAL',
      desc: 'High Precision, Low Creativity',
      text: "These wireless earbuds feature active noise cancellation, 8-hour battery life, and Bluetooth 5.2 connectivity. Available in black and white.",
      borderColor: 'border-brand-blue',
      icon: Snowflake
    };
    if (t < 0.8) return {
      type: 'BALANCED',
      desc: 'Standard Mix',
      text: "Experience sound like never before with our new wireless earbuds. With 8 hours of play and silencing noise cancellation, your music comes first.",
      borderColor: 'border-purple-500',
      icon: Sparkles
    };
    return {
      type: 'CREATIVE',
      desc: 'High Randomness',
      text: "Freedom has a new sound. Slip into audio nirvana where the world fades away and only the rhythm remains. Pure, unadulterated sonic bliss.",
      borderColor: 'border-brand-orange',
      icon: Flame
    };
  };

  const output = getOutput(temp);
  const OutputIcon = output.icon;

  const handleModeSelect = (m: 'finley' | 'brightcart') => {
      setMode(m);
      // Auto-set optimal temp for demonstration
      if (m === 'finley') setTemp(0.1);
      if (m === 'brightcart') setTemp(0.8);
  };

  return (
    <ModuleWrapper 
      title="Parameters & Control" 
      moduleId={2} 
      onComplete={onComplete} 
      quizQuestions={M2_QUESTIONS} 
      track={track}
      hero={
        <VideoHero 
          moduleId={2}
          title="Parameters & Control"
          subtitle="Consistency vs. Creativity"
          description="Finley needs their compliance reports to be identical every time. BrightCart needs 50 unique marketing slogans. If you use the same settings for both, one will fail."
          imageKeyword="mixing console"
        />
      }
    >
      
      {/* 2.1 Why This Matters */}
      <section className="mb-12">
         <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-sm">02</span>
            Context
         </h2>
         <div className="bg-white border-l-4 border-brand-orange p-6 shadow-clean rounded-r-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "One consultant generates a precise, factual compliance summary. Another gets... creative interpretations of tax law. Same AI. Same prompt. Completely different outputs."
            </p>
         </div>
      </section>

      <section className="bg-brand-black text-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Background blobs for visual interest */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div>
              <h3 className="text-xl font-bold">Temperature Simulator</h3>
              <p className="text-gray-400 text-sm">Adjust to see how randomness affects output.</p>
            </div>
            
             {/* Case Study Toggles */}
            <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
               <button
                type="button"
                onClick={() => handleModeSelect('finley')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'finley' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
               >
                 <Building2 size={12} /> Finley
               </button>
               <button
                type="button"
                onClick={() => handleModeSelect('brightcart')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'brightcart' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
               >
                 <ShoppingCart size={12} /> BrightCart
               </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Precision</span>
            <span className="text-4xl font-mono font-light tracking-tighter text-brand-blue">{temp.toFixed(1)}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Creativity</span>
          </div>
          
          <div className="mb-12">
             <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-blue hover:accent-blue-400 transition-all"
              aria-label="Temperature control slider"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Input Prompt</div>
              <p className="text-white font-serif italic text-lg opacity-90">
                 {mode === 'finley' && '"Summarize GDPR Article 5 for the client report."'}
                 {mode === 'brightcart' && '"Write a tagline for our new hiking socks."'}
                 {mode === 'neutral' && '"Write a product description for wireless earbuds."'}
              </p>
            </div>

            <div className={`bg-white rounded-xl p-6 border-l-4 ${output.borderColor} text-brand-black shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">{output.type}</div>
                <OutputIcon size={16} className="text-gray-400"/>
              </div>
              <p className="leading-relaxed font-medium">
                {output.text}
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                {output.desc}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track-specific callout */}
      {track === 'advanced' && (
        <section className="mt-8 max-w-3xl mx-auto px-6">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 mb-2">Advanced: Beyond Temperature</h4>
            <p className="text-sm text-purple-700 mb-3">
              Temperature is just one sampling parameter. <strong>Top-P (nucleus sampling)</strong> limits the token pool to the 
              top probability mass. <strong>Top-K</strong> limits to the top K tokens. <strong>Frequency/Presence penalties</strong> reduce repetition.
            </p>
            <p className="text-sm text-purple-700">
              For production systems, consider using <code className="bg-purple-100 px-1 rounded">temperature=0</code> with 
              <code className="bg-purple-100 px-1 rounded">seed</code> parameters for reproducible outputs in testing and debugging.
            </p>
          </div>
        </section>
      )}

      {track === 'foundation' && (
        <section className="mt-8 max-w-3xl mx-auto px-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-2">Key Takeaway</h4>
            <p className="text-sm text-green-700">
              Temperature is like a "creativity dial." Turn it down (0.0-0.3) when you need consistent, factual responses. 
              Turn it up (0.7-1.0) when you want variety and creative ideas. There's no right answer—it depends on your task.
            </p>
          </div>
        </section>
      )}
    </ModuleWrapper>
  );
};