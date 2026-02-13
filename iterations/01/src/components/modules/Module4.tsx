import React, { useState } from 'react';
import { ModuleWrapper } from '../ModuleWrapper';
import { M4_QUESTIONS } from '../../constants';
import { Globe, Clock, Building2, ShoppingCart, Search, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { ProficiencyTrack } from '../../types';
import { VideoHero } from '../VideoHero';

export const Module4: React.FC<{onComplete: (s: number)=>void, track?: ProficiencyTrack}> = ({onComplete, track}) => {
  const [mode, setMode] = useState<'finley' | 'brightcart' | null>(null);
  const [isGrounded, setIsGrounded] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scenarios = {
    finley: {
      query: "What are the current FCA regulations on AI disclosure for financial advice?",
      nonGrounded: {
        response: "According to the FCA guidelines from 2022, firms must disclose when AI is used in financial advice. The key regulation is FCA Handbook SYSC 8.1.4 which requires clear documentation of algorithmic decision-making.",
        problems: [
          "FCA updated AI guidance in March 2024 - this response misses 2 years of regulatory change",
          "SYSC 8.1.4 doesn't exist - the model hallucinated a plausible-sounding reference",
          "Client could receive non-compliant advice based on outdated information"
        ],
        verdict: "DANGEROUS - Regulatory advice requires current data"
      },
      grounded: {
        response: "Based on current FCA guidance (last updated March 2024), firms using AI in financial advice must: (1) Clearly disclose AI involvement to consumers, (2) Maintain human oversight per Consumer Duty requirements, (3) Document decision-making processes. Source: FCA.org.uk/publications/guidance/ai-machine-learning",
        benefits: [
          "Cites the actual March 2024 update with source URL",
          "References real regulatory framework (Consumer Duty)",
          "Client receives accurate, defensible advice"
        ],
        verdict: "SAFE - Verifiable, current, citable"
      }
    },
    brightcart: {
      query: "Is the Patagonia Better Sweater currently in stock in size Medium?",
      nonGrounded: {
        response: "The Patagonia Better Sweater is a popular fleece jacket available in sizes XS-XXL. It typically retails for around $139 and comes in various colors including black, navy, and grey.",
        problems: [
          "Doesn't answer the actual question - is it IN STOCK right now?",
          "Price may be outdated (Patagonia updated pricing in 2024)",
          "Customer leaves without the information they need"
        ],
        verdict: "USELESS - Generic info doesn't help the customer buy"
      },
      grounded: {
        response: "Checking BrightCart inventory... The Patagonia Better Sweater in Medium is currently: ✓ In stock (3 units) in Black, ✗ Out of stock in Navy (restocking Thursday), ✓ In stock (1 unit) in Grey. Current price: $149. Would you like me to reserve one?",
        benefits: [
          "Answers the exact question with real-time inventory",
          "Provides actionable next steps (reserve option)",
          "Customer can make an immediate purchase decision"
        ],
        verdict: "CONVERSION - Real data drives real sales"
      }
    }
  };

  const handleScenarioSelect = (scenario: 'finley' | 'brightcart') => {
    setMode(scenario);
    setIsGrounded(false);
    setShowResult(false);
  };

  const handleToggleGrounding = () => {
    setIsGrounded(!isGrounded);
    setShowResult(true);
  };

  const currentScenario = mode ? scenarios[mode] : null;
  const currentResult = currentScenario ? (isGrounded ? currentScenario.grounded : currentScenario.nonGrounded) : null;

  return (
    <ModuleWrapper 
      title="Web-Grounding" 
      moduleId={4} 
      onComplete={onComplete} 
      quizQuestions={M4_QUESTIONS} 
      track={track}
      hero={
        <VideoHero 
          moduleId={4}
          title="Web-Grounding"
          subtitle="Static vs. Dynamic Knowledge"
          description="Finley's consultants need today's regulations, not last year's. BrightCart needs real-time stock levels. Static models are frozen in time; Grounding connects them to the present."
          imageKeyword="global network"
        />
      }
    >
       
      {/* Why This Matters */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center text-sm">04</span>
          Context
        </h2>
        <div className="bg-white border-l-4 border-brand-orange p-6 shadow-clean rounded-r-xl mb-6">
          <p className="text-gray-700 italic mb-4">
            "A consultant advises a client on FCA regulations that changed three months ago. The AI confidently explains the old framework—because that's all it knows. The client's compliance team catches the error. Trust is broken."
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Models have a "knowledge cutoff"—they don't know what happened after their training data ended.
          </p>
        </div>
      </section>

      {/* Concept Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-brand-black">The Knowledge Cutoff Problem</h3>
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          Every AI model is trained on data up to a specific date. After that date, it's blind. It doesn't know about new laws, price changes, personnel moves, or breaking news—unless it can search the web in real-time.
        </p>
        <div className="bg-blue-50 p-6 rounded-xl">
          <p className="text-brand-dark font-medium">
            <span className="text-brand-blue font-bold uppercase tracking-wide text-xs block mb-1">Key Concept</span>
            <strong>Web-Grounding</strong> gives the model live access to current information. Without it, you're getting answers from a snapshot frozen in time.
          </p>
        </div>
      </section>

      {/* Static vs Dynamic Comparison */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-3 rounded-full"><Clock className="text-gray-600"/></div>
              <h3 className="font-bold text-lg">Non-Grounded (Static)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">The model relies only on its training data.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Creative writing & brainstorming</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Analyzing documents you paste in</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Coding help & explanations</li>
              <li className="flex gap-2"><XCircle size={16} className="text-red-500 shrink-0 mt-0.5"/> Current stock prices or inventory</li>
              <li className="flex gap-2"><XCircle size={16} className="text-red-500 shrink-0 mt-0.5"/> Recent news or regulatory changes</li>
              <li className="flex gap-2"><XCircle size={16} className="text-red-500 shrink-0 mt-0.5"/> Today's weather or live data</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-brand-green">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full"><Globe className="text-brand-green"/></div>
              <h3 className="font-bold text-lg">Web-Grounded (Dynamic)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">The model searches the web before answering.</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Competitor research with sources</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Citing current regulations</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> Real-time inventory/pricing</li>
              <li className="flex gap-2"><AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5"/> Slower response time (search takes time)</li>
              <li className="flex gap-2"><AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5"/> May cite unreliable sources</li>
              <li className="flex gap-2"><AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5"/> Results depend on search quality</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Grounding Simulator */}
      <section className="mb-8">
        <div className="bg-brand-black text-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
              <div>
                <h3 className="text-xl font-bold">Grounding Simulator</h3>
                <p className="text-gray-400 text-sm">See how web access changes the response.</p>
              </div>
              
              {/* Case Study Toggles */}
              <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleScenarioSelect('finley')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'finley' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Building2 size={12} /> Finley (Compliance)
                </button>
                <button
                  type="button"
                  onClick={() => handleScenarioSelect('brightcart')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${mode === 'brightcart' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <ShoppingCart size={12} /> BrightCart (Retail)
                </button>
              </div>
            </div>

            {!mode ? (
              <div className="text-center py-12 text-gray-500">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a scenario above to begin</p>
              </div>
            ) : (
              <>
                {/* Query Display */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm mb-6">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">User Query</div>
                  <p className="text-white font-medium text-lg">"{currentScenario?.query}"</p>
                </div>

                {/* Grounding Toggle */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`text-sm font-bold ${!isGrounded ? 'text-white' : 'text-gray-500'}`}>
                    <Clock size={16} className="inline mr-1" /> Static
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleGrounding}
                    className={`relative w-16 h-8 rounded-full transition-colors ${isGrounded ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${isGrounded ? 'translate-x-9' : 'translate-x-1'}`}>
                      {isGrounded ? <Globe size={14} className="m-1 text-green-500"/> : <Clock size={14} className="m-1 text-gray-500"/>}
                    </div>
                  </button>
                  <span className={`text-sm font-bold ${isGrounded ? 'text-green-400' : 'text-gray-500'}`}>
                    <Globe size={16} className="inline mr-1" /> Grounded
                  </span>
                </div>

                {/* Response Display */}
                {showResult && currentResult && (
                  <div className="animate-fade-in">
                    <div className={`bg-white rounded-xl p-6 text-brand-black mb-6 border-l-4 ${isGrounded ? 'border-green-500' : 'border-red-500'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        {isGrounded ? (
                          <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase">
                            <RefreshCw size={14} /> Searching web...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
                            <Clock size={14} /> Using training data only
                          </div>
                        )}
                      </div>
                      <p className="leading-relaxed">{currentResult.response}</p>
                    </div>

                    {/* Analysis */}
                    <div className={`rounded-xl p-6 ${isGrounded ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${isGrounded ? 'text-green-400' : 'text-red-400'}`}>
                        {isGrounded ? <CheckCircle size={18}/> : <AlertTriangle size={18}/>}
                        {isGrounded ? 'Why This Works' : 'What Went Wrong'}
                      </h4>
                      <ul className="space-y-2">
                        {(isGrounded ? currentResult.benefits : currentResult.problems)?.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex gap-2">
                            <span className={`shrink-0 ${isGrounded ? 'text-green-400' : 'text-red-400'}`}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className={`mt-4 pt-4 border-t ${isGrounded ? 'border-green-800' : 'border-red-800'}`}>
                        <span className={`text-xs font-bold uppercase tracking-wider ${isGrounded ? 'text-green-400' : 'text-red-400'}`}>
                          {currentResult.verdict}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-brand-black">When to Enable Grounding</h3>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-brand-green mb-3 flex items-center gap-2">
                <Globe size={18}/> Use Grounding When:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Regulatory or legal information is involved</li>
                <li>• You need current prices, stock, or availability</li>
                <li>• Recent news or events are relevant</li>
                <li>• You need to cite verifiable sources</li>
                <li>• Accuracy matters more than speed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-600 mb-3 flex items-center gap-2">
                <Clock size={18}/> Skip Grounding When:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Writing creative content or brainstorming</li>
                <li>• Analyzing documents you've pasted in</li>
                <li>• Historical information (won't have changed)</li>
                <li>• Speed is critical and stakes are low</li>
                <li>• You're working with internal/private data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Track-specific callout */}
      {track === 'advanced' && (
        <section className="mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 mb-2">Advanced: RAG vs. Web Grounding</h4>
            <p className="text-sm text-purple-700">
              Web grounding searches public internet. <strong>RAG (Retrieval-Augmented Generation)</strong> searches your own documents. 
              Enterprise deployments often combine both: RAG for internal knowledge bases, web grounding for market/regulatory updates. 
              The key is knowing which source of truth applies to your query.
            </p>
          </div>
        </section>
      )}

    </ModuleWrapper>
  );
};