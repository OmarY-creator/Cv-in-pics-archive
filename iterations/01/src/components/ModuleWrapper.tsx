import React, { useState } from 'react';
import { Question, ProficiencyTrack } from '../types';
import { Check, AlertCircle, ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';

interface ModuleWrapperProps {
  title: string;
  moduleId: number;
  onComplete: (score: number) => void;
  children: React.ReactNode;
  quizQuestions: Question[];
  track?: ProficiencyTrack;
  idNote?: string;
  hero?: React.ReactNode;
}

export const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ 
  title, 
  moduleId, 
  onComplete, 
  children, 
  quizQuestions,
  track,
  idNote,
  hero
}) => {
  const [step, setStep] = useState<'learn' | 'quiz'>('learn');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Instructional Design Theories per module (fallback if not passed)
  const defaultNotes: Record<number, string> = {
    1: "Cognitive Load Theory: Breaking down the abstract 'token' concept into concrete cost/capacity units to reduce intrinsic load.",
    2: "Kolb's Experiential Learning: Concrete Experience (simulator) precedes Reflective Observation (theory).",
    3: "Scaffolding (Vygotsky): Providing a rigid framework (CRISP) that can be removed as learner autonomy increases.",
    4: "Constructivism: Learners construct understanding by comparing divergent outputs (grounded vs non-grounded).",
    5: "Situated Learning: Presenting security protocols within authentic, high-stakes business narratives."
  };

  const currentIdNote = idNote || defaultNotes[moduleId];

  const handleSubmitQuiz = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (q.options.find(o => o.isCorrect)?.id === answers[q.id]) {
        correct++;
      }
    });
    const score = (correct / quizQuestions.length) * 100;
    setSubmitted(true);
    setTimeout(() => {
      onComplete(score);
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Optional Hero Section (Video/Intro) - Only visible in Learning mode */}
      {step === 'learn' && hero && (
        <div className="w-full mb-8">
          {hero}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 pb-24">
        {step === 'learn' && (
          <div className="mb-12 border-b border-gray-100 pb-8 mt-12">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-medium text-brand-blue mb-2 block">MODULE 0{moduleId}</span>
                <h1 className="text-4xl font-bold text-brand-black tracking-tight">{title}</h1>
              </div>
              {track && (
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold uppercase tracking-wider">
                  {track} Track
                </span>
              )}
            </div>
          </div>
        )}

        {step === 'learn' ? (
          <div className="animate-fade-in">
            {children}
            
            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setStep('quiz')}
                className="group flex items-center gap-3 bg-brand-black text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-lg"
              >
                <span>Verify Knowledge</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Instructional Design Note Footer */}
            <div className="mt-12 p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500 flex items-start gap-3">
              <BookOpen size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-700 mb-1">Instructional Design Note</strong>
                {currentIdNote}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in max-w-2xl mx-auto mt-12">
            
            {/* Back Navigation for Quiz */}
            <div className="mb-6">
              <button 
                onClick={() => setStep('learn')}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-black transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 -ml-3"
              >
                <ChevronLeft size={16} /> Back to Lesson
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-clean-lg border border-gray-100 overflow-hidden">
              <div className="bg-brand-gray px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-brand-black">Assessment</h2>
                <p className="text-gray-500 text-sm mt-1">Demonstrate your understanding to unlock the next key.</p>
              </div>
              
              <div className="p-8 space-y-10">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="">
                    <p className="font-medium text-lg text-brand-black mb-4 leading-relaxed">
                      <span className="text-gray-300 mr-2">{String(idx + 1).padStart(2, '0')}</span>
                      {q.text}
                    </p>
                    <div className="space-y-3 pl-8">
                      {q.options.map(opt => (
                        <label 
                          key={opt.id} 
                          className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                            answers[q.id] === opt.id 
                              ? 'border-brand-black bg-gray-50' 
                              : 'border-gray-100 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers[q.id] === opt.id ? 'border-brand-black' : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {answers[q.id] === opt.id && <div className="w-2.5 h-2.5 bg-brand-black rounded-full" />}
                          </div>
                          <span className="text-gray-700 text-sm group-hover:text-black">{opt.text}</span>
                          <input 
                            type="radio" 
                            name={q.id}
                            value={opt.id}
                            disabled={submitted}
                            onChange={() => setAnswers({...answers, [q.id]: opt.id})}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                    {submitted && (
                      <div className={`mt-4 ml-8 p-4 rounded-lg text-sm flex items-start gap-3 ${
                        q.options.find(o => o.isCorrect)?.id === answers[q.id] 
                          ? 'bg-green-50 text-green-800' 
                          : 'bg-red-50 text-red-800'
                      }`}>
                        {q.options.find(o => o.isCorrect)?.id === answers[q.id] 
                          ? <Check size={18} className="mt-0.5 shrink-0"/> 
                          : <AlertCircle size={18} className="mt-0.5 shrink-0"/>
                        }
                        <div>
                          <span className="font-bold block mb-1">{q.options.find(o => o.isCorrect)?.id === answers[q.id] ? 'Correct' : 'Incorrect'}</span>
                          {q.feedback}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-brand-gray border-t border-gray-100">
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length !== quizQuestions.length || submitted}
                  className="w-full bg-brand-black text-white py-4 rounded-xl font-bold shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitted ? "Processing..." : "Submit Assessment"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};