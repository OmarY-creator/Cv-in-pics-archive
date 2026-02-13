import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../constants';
import { ProficiencyTrack } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface DiagnosticProps {
  onComplete: (score: number, track: ProficiencyTrack) => void;
}

export const Diagnostic: React.FC<DiagnosticProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const question = DIAGNOSTIC_QUESTIONS[currentQIndex];
  const isLast = currentQIndex === DIAGNOSTIC_QUESTIONS.length - 1;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setAnswers(prev => ({ ...prev, [question.id]: optionId }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLast) {
      calculateAndFinish();
    } else {
      setShowFeedback(false);
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const calculateAndFinish = () => {
    let correctCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      const selectedId = answers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      if (selectedId === correctOption?.id) {
        correctCount++;
      }
    });

    const percentage = (correctCount / DIAGNOSTIC_QUESTIONS.length) * 100;
    let track: ProficiencyTrack = 'foundation';
    if (percentage > 40) track = 'practitioner';
    if (percentage > 70) track = 'advanced';

    onComplete(percentage, track);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Diagnostic Assessment</h2>
            <p className="text-gray-500 text-sm">Let's find your starting point.</p>
          </div>
          <span className="text-brand-blue font-bold">
            {currentQIndex + 1} / {DIAGNOSTIC_QUESTIONS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-brand-blue transition-all duration-500 ease-out"
            style={{ width: `${((currentQIndex) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-medium mb-6">{question.text}</h3>

          <div className="space-y-3">
            {question.options.map(opt => {
              const isSelected = answers[question.id] === opt.id;
              const isCorrect = opt.isCorrect;
              
              let borderClass = 'border-gray-200 hover:border-brand-blue';
              let bgClass = 'bg-white';
              
              if (showFeedback) {
                if (isCorrect) {
                  borderClass = 'border-brand-green bg-green-50';
                } else if (isSelected && !isCorrect) {
                  borderClass = 'border-brand-red bg-red-50';
                } else {
                  borderClass = 'border-gray-100 opacity-50';
                }
              } else if (isSelected) {
                borderClass = 'border-brand-blue bg-blue-50';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${borderClass} ${bgClass}`}
                >
                  <span>{opt.text}</span>
                  {showFeedback && isCorrect && <CheckCircle2 className="text-brand-green" size={20} />}
                  {showFeedback && isSelected && !isCorrect && <Circle className="text-brand-red" size={20} />}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-6 animate-fade-in">
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-4 border-brand-blue mb-4">
                <strong>Insight:</strong> {question.feedback}
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
              >
                {isLast ? "See Results" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
