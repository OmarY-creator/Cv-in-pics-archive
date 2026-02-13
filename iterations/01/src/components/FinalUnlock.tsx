import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Copy, Check } from 'lucide-react';

interface FinalUnlockProps {
  profile: UserProfile;
}

export const FinalUnlock: React.FC<FinalUnlockProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);

  // Logic to generate the system prompt based on user profile
  const generateSystemPrompt = () => {
    const isClaude = profile.primaryUseCase === 'writing' || profile.primaryUseCase === 'analysis';
    const temp = profile.prefersPrecision ? 0.3 : (profile.prefersCreativity ? 0.8 : 0.5);
    
    // Constructing the PromptWriter content
    if (isClaude) {
      // XML Format
      return `<system_instruction>
  <user_profile>
    <name>${profile.name}</name>
    <role>${profile.primaryUseCase.replace('_', ' ')}</role>
    <style>${profile.workStyle}</style>
  </user_profile>

  <operational_parameters>
    <temperature>${temp}</temperature>
    <risk_tolerance>${profile.riskTolerance}</risk_tolerance>
  </operational_parameters>

  <critical_instructions>
    ${profile.securityConscious > 50 ? '<security>NEVER output PII or internal identifiers. Use placeholders.</security>' : ''}
    <format>Use clear markdown headers and bullet points.</format>
    <tone>${profile.workStyle === 'structured' ? 'Formal, precise, and concise.' : 'Conversational and engaging.'}</tone>
  </critical_instructions>
</system_instruction>`;
    } else {
      // Markdown Format
      return `### System Instruction

**Role:** You are an expert assistant for ${profile.name}, specializing in ${profile.primaryUseCase.replace('_', ' ')}.

**Style Guide:**
- Tone: ${profile.workStyle === 'structured' ? 'Professional and brief' : 'Friendly and expansive'}.
- Creativity Level: ${temp > 0.6 ? 'High (Think outside the box)' : 'Low (Stick to facts)'}.

**Security Protocols:**
${profile.securityConscious > 50 ? '- REDACT all personal identifiable information.\n- Do not speculate on legal/medical advice.' : '- Maintain standard safety protocols.'}

**Output Preferences:**
- Always structure answers with clear headings.
- If unsure, ask clarifying questions before answering.`;
    }
  };

  const promptCode = generateSystemPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(promptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto pt-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Configuration Unlocked</h1>
          <p className="text-xl text-gray-600">
            Based on your work style and assessment performance, we've architected your personal System Instruction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-blue">
             <div className="text-xs font-bold text-gray-400 uppercase">Recommended Model</div>
             <div className="text-2xl font-bold text-brand-blue">
               {profile.primaryUseCase === 'coding' ? 'GPT-4o / Claude 3.5 Sonnet' : 'Claude 3.5 Sonnet'}
             </div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-orange">
             <div className="text-xs font-bold text-gray-400 uppercase">Optimal Temperature</div>
             <div className="text-2xl font-bold text-brand-orange">
               {profile.prefersPrecision ? '0.2 - 0.4' : '0.7 - 0.9'}
             </div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-green">
             <div className="text-xs font-bold text-gray-400 uppercase">Security Level</div>
             <div className="text-2xl font-bold text-brand-green">
               {profile.securityConscious > 70 ? 'Strict' : 'Standard'}
             </div>
           </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
             <span className="font-mono text-sm text-gray-400">system_instruction.txt</span>
             <button 
               onClick={handleCopy}
               className="flex items-center gap-2 px-4 py-2 bg-brand-blue rounded-lg text-white text-sm font-bold hover:bg-blue-600 transition-colors"
             >
               {copied ? <Check size={16}/> : <Copy size={16}/>}
               {copied ? "Copied!" : "Copy to Clipboard"}
             </button>
          </div>
          <div className="p-8 overflow-x-auto">
            <pre className="font-mono text-green-400 text-sm whitespace-pre-wrap leading-relaxed">
              {promptCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
