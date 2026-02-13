import React, { useState } from 'react';
import { ModuleWrapper } from '../ModuleWrapper';
import { M5_QUESTIONS } from '../../constants';
import { ShieldAlert, ShieldCheck, Building2, ShoppingCart, Eye, EyeOff, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { ProficiencyTrack } from '../../types';
import { VideoHero } from '../VideoHero';

export const Module5: React.FC<{onComplete: (s: number)=>void, track?: ProficiencyTrack}> = ({onComplete, track}) => {
  const [mode, setMode] = useState<'finley' | 'brightcart' | null>(null);
  const [inputText, setInputText] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenarios = {
    finley: {
      unsafe: `Dear Team,

Please review the attached M&A proposal for Acme Corp's acquisition of Beta Industries. 
Key financials:
- Deal value: £45.2M
- CEO John Mitchell's personal guarantee of £2M
- Target EBITDA: £8.3M
- Bank account ending 4521 for escrow

The client contact is Sarah Williams (sarah.williams@acmecorp.com, +44 7700 900123).

Please summarise the key risks for the board presentation tomorrow.`,
      safe: `Dear Team,

Please review the attached M&A proposal for [Client A]'s acquisition of [Target B].
Key financials:
- Deal value: [Mid-8 figures]
- Personal guarantee from principal
- Target EBITDA: [Strong]
- Escrow arrangements in place

Please summarise the key risks for the board presentation tomorrow.`,
      risks: [
        { text: "Acme Corp / Beta Industries", type: "company", severity: "high" },
        { text: "£45.2M deal value", type: "financial", severity: "high" },
        { text: "John Mitchell (CEO name)", type: "personal", severity: "critical" },
        { text: "Bank account 4521", type: "financial", severity: "critical" },
        { text: "Sarah Williams email & phone", type: "personal", severity: "critical" },
        { text: "£2M personal guarantee", type: "financial", severity: "high" }
      ]
    },
    brightcart: {
      unsafe: `Customer complaint ticket #4892:

Customer: Emma Thompson (emma.t@gmail.com)
Order: #BC-2024-89421
Payment: Visa ending 8834
Shipping: 42 Oak Lane, Manchester, M1 4BH

Issue: Customer claims item arrived damaged. Requesting refund of £89.99 to original payment method.

Please draft a response offering a replacement or refund.`,
      safe: `Customer complaint ticket #[REDACTED]:

Customer: [Customer Name]
Order: #[Order ID]
Payment: [Card on file]
Shipping: [Delivery address on file]

Issue: Customer claims item arrived damaged. Requesting refund to original payment method.

Please draft a response offering a replacement or refund.`,
      risks: [
        { text: "Emma Thompson (full name)", type: "personal", severity: "high" },
        { text: "emma.t@gmail.com", type: "personal", severity: "critical" },
        { text: "Visa ending 8834", type: "financial", severity: "critical" },
        { text: "42 Oak Lane, Manchester", type: "personal", severity: "critical" },
        { text: "Order #BC-2024-89421", type: "business", severity: "medium" },
        { text: "£89.99 refund amount", type: "financial", severity: "low" }
      ]
    }
  };

  const handleScenarioSelect = (scenario: 'finley' | 'brightcart') => {
    setMode(scenario);
    setInputText(scenarios[scenario].unsafe);
    setShowAnalysis(false);
  };

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  const handleAnonymize = () => {
    if (mode) {
      setInputText(scenarios[mode].safe);
      setShowAnalysis(false);
    }
  };

  const currentScenario = mode ? scenarios[mode] : null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'personal': return '👤';
      case 'financial': return '💳';
      case 'company': return '🏢';
      default: return '📋';
    }
  };

  return (
    <ModuleWrapper 
      title="Data Security" 
      moduleId={5} 
      onComplete={onComplete} 
      quizQuestions={M5_QUESTIONS} 
      track={track}
      hero={
        <VideoHero 
          moduleId={5}
          title="Data Security"
          subtitle="The No-Go List"
          description="A single data leak is catastrophic. Finley's junior consultant almost pasted a confidential M&A deal into a public tool. Security isn't an IT problem; it's a prompt engineering problem."
          imageKeyword="cyber security"
        />
      }
    >
       
      {/* Why This Matters */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-sm">05</span>
          Context
        </h2>
        <div className="bg-white border-l-4 border-brand-orange p-6 shadow-clean rounded-r-xl mb-6">
          <p className="text-gray-700 italic mb-4">
            "She's rushing to prepare a client presentation. To save time, she pastes the entire M&A briefing—names, figures, bank details—into a free AI tool. That data may now be stored, logged, or used to train future models. The leak is invisible, but permanent."
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Public AI tools often retain inputs for model improvement. Once sent, you cannot guarantee deletion.
          </p>
        </div>
      </section>

      {/* Concept Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-brand-black">The Invisible Leak</h3>
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          When you use a public AI (free ChatGPT, consumer Gemini), your inputs may be stored and used to improve the model. 
          This means confidential data could theoretically appear in responses to other users, or be accessible in data breaches.
        </p>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <p className="text-red-800 font-medium">
            <span className="text-red-600 font-bold uppercase tracking-wide text-xs block mb-1">Critical Rule</span>
            <strong>Assume every character you type into a public AI could become public.</strong> Act accordingly.
          </p>
        </div>
      </section>

      {/* The No-Go List */}
      <section className="mb-12">
        <div className="bg-red-50 border-l-8 border-brand-red rounded-r-xl p-8 shadow-sm">
          <h3 className="text-brand-red font-bold text-xl flex items-center gap-2 mb-6">
            <ShieldAlert /> NEVER share with public AI:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { text: "Full names + sensitive context", icon: "👤" },
              { text: "Financial account numbers", icon: "💳" },
              { text: "Passwords or API keys", icon: "🔐" },
              { text: "Client-identifiable details", icon: "🏢" },
              { text: "Proprietary code or formulas", icon: "💻" },
              { text: "Health or medical information", icon: "🏥" },
              { text: "Home addresses or phone numbers", icon: "📍" },
              { text: "Internal pricing or deal terms", icon: "💰" }
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-red-100">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-gray-800 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive: Data Risk Scanner */}
      <section className="mb-12">
        <div className="bg-brand-black text-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
              <div>
                <h3 className="text-xl font-bold">Data Risk Scanner</h3>
                <p className="text-gray-400 text-sm">Identify sensitive data before you paste.</p>
              </div>
              
              {/* Case Study Toggles */}
              <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleScenarioSelect('finley')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'finley' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Building2 size={12} /> Finley (M&A Deal)
                </button>
                <button
                  type="button"
                  onClick={() => handleScenarioSelect('brightcart')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'brightcart' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <ShoppingCart size={12} /> BrightCart (Customer)
                </button>
              </div>
            </div>

            {!mode ? (
              <div className="text-center py-12 text-gray-500">
                <Lock size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a scenario above to begin</p>
              </div>
            ) : (
              <>
                {/* Text Input */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prompt Content</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAnalyze}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                      >
                        <Eye size={12} /> Scan Risks
                      </button>
                      <button
                        type="button"
                        onClick={handleAnonymize}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                      >
                        <EyeOff size={12} /> Anonymize
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => { setInputText(e.target.value); setShowAnalysis(false); }}
                    className="w-full h-48 p-4 bg-gray-800 border border-gray-700 rounded-xl text-white font-mono text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    placeholder="Paste content to analyze for data risks..."
                  />
               
                </div>

                {/* Risk Analysis */}
                {showAnalysis && currentScenario && (
                  <div className="animate-fade-in">
                    <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 mb-4">
                      <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        {currentScenario.risks.length} Data Risks Detected
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentScenario.risks.map((risk, idx) => (
                          <div 
                            key={idx}
                            className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 ${getSeverityColor(risk.severity)}`}
                          >
                            <span>{getTypeIcon(risk.type)}</span>
                            <span className="flex-1">{risk.text}</span>
                            <span className="text-xs uppercase opacity-75">{risk.severity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4 text-center">
                      <p className="text-gray-300 text-sm mb-3">
                        <ShieldAlert size={16} className="inline mr-2 text-red-400" />
                        This content should <strong className="text-red-400">NOT</strong> be pasted into a public AI tool.
                      </p>
                      <button
                        type="button"
                        onClick={handleAnonymize}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                      >
                        Click to See Safe Version
                      </button>
                    </div>
                  </div>
                )}

                {/* Safe Version Indicator */}
                {inputText === currentScenario?.safe && (
                  <div className="animate-fade-in bg-green-900/30 border border-green-800 rounded-xl p-6">
                    <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                      <ShieldCheck size={18} />
                      Anonymized Version - Safe to Use
                    </h4>
                    <p className="text-gray-300 text-sm">
                      This version removes identifiable information while preserving the context needed for the AI to help. 
                      The model can still draft a response, analyse risks, or provide advice—without exposing sensitive data.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Safe Practices */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-brand-black">Anonymization Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-brand-green flex items-center gap-2 mb-3">
              <ShieldCheck size={18}/> Safe Replacements
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>"Acme Corp"</strong> → "Client A" or "[Company Name]"</li>
              <li><strong>"John Smith"</strong> → "the CEO" or "[Executive]"</li>
              <li><strong>"£45.2M"</strong> → "mid-8 figures" or "[deal value]"</li>
              <li><strong>"4521"</strong> → "[account number]" or remove entirely</li>
              <li><strong>"Manchester, M1 4BH"</strong> → "[delivery address on file]"</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold text-brand-blue flex items-center gap-2 mb-3">
              <Lock size={18}/> Enterprise Alternatives
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Azure OpenAI / Bedrock</strong> - Data not used for training</li>
              <li><strong>ChatGPT Enterprise</strong> - SOC 2 compliant, no training</li>
              <li><strong>On-premise LLMs</strong> - Data never leaves your network</li>
              <li><strong>API with opt-out</strong> - Explicit data usage controls</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Check with your IT/Security team for approved tools.
            </p>
          </div>
        </div>
      </section>

      {/* Track-specific callout */}
      {track === 'advanced' && (
        <section className="mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 mb-2">Advanced: Data Classification Frameworks</h4>
            <p className="text-sm text-purple-700 mb-3">
              Enterprise AI policies typically define data tiers: <strong>Public</strong> (press releases), 
              <strong>Internal</strong> (org charts), <strong>Confidential</strong> (financials), and 
              <strong>Restricted</strong> (PII, M&A). Map each tier to permitted AI tools.
            </p>
            <p className="text-sm text-purple-700">
              Consider implementing <strong>prompt guardrails</strong>—automated scanning that blocks 
              sensitive patterns (credit card regex, email formats) before they reach the model.
            </p>
          </div>
        </section>
      )}

      {/* Quick Reference Card */}
      <section>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-bold text-brand-black mb-4">Quick Decision Tree</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-lg">1️⃣</span>
              <p><strong>Could this identify a real person or company?</strong> If yes → Anonymize or use enterprise tool</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">2️⃣</span>
              <p><strong>Would this be embarrassing if leaked?</strong> If yes → Don't paste it</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">3️⃣</span>
              <p><strong>Is this already public information?</strong> If yes → Generally safe for public AI</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">4️⃣</span>
              <p><strong>When in doubt?</strong> Anonymize. It takes 30 seconds and costs nothing.</p>
            </div>
          </div>
        </div>
      </section>

    </ModuleWrapper>
  );
};
