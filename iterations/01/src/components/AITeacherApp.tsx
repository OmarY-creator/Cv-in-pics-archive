import React, { useState } from 'react';
import { AppState, UserProfile, ProficiencyTrack } from '../types';
import { Layout } from './Layout';
import { IntakeForm } from './IntakeForm';
import { Diagnostic } from './Diagnostic';
import { Module1 } from './modules/Module1';
import { Module2 } from './modules/Module2';
import { Module3 } from './modules/Module3';
import { Module4 } from './modules/Module4';
import { Module5 } from './modules/Module5';
import { FinalUnlock } from './FinalUnlock';

const INITIAL_PROFILE: UserProfile = {
  name: '',
  primaryUseCase: 'writing',
  workStyle: 'balanced',
  riskTolerance: 'moderate',
  track: 'foundation',
  technicalComfort: 0,
  prefersPrecision: false,
  prefersCreativity: false,
  securityConscious: 0
};

const INITIAL_STATE: AppState = {
  view: 'intake',
  currentModuleId: 1,
  completedModules: [],
  moduleScores: {},
  unlockedKeys: [false, false, false, false, false],
  profile: INITIAL_PROFILE
};

interface AITeacherAppProps {
  onExit: () => void;
}

export const AITeacherApp: React.FC<AITeacherAppProps> = ({ onExit }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // Intake Complete Handler
  const handleIntakeComplete = (partialProfile: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...partialProfile },
      view: 'diagnostic'
    }));
  };

  // Diagnostic Complete Handler
  const handleDiagnosticComplete = (score: number, track: ProficiencyTrack) => {
    setState(prev => ({
      ...prev,
      profile: { 
        ...prev.profile, 
        track, 
        technicalComfort: score,
        prefersPrecision: score > 70
      },
      view: 'learning',
      currentModuleId: 1
    }));
  };

  // Module Complete Handler
  const handleModuleComplete = (moduleId: number, score: number) => {
    const passed = score >= 80;
    
    // Update Keys
    const newKeys = [...state.unlockedKeys];
    if (passed) {
      newKeys[moduleId - 1] = true;
    }

    // Update Profile based on performance
    const newProfile = { ...state.profile };
    if (moduleId === 2 && passed) {
       newProfile.prefersPrecision = true;
    }
    if (moduleId === 5) {
      newProfile.securityConscious = score;
    }

    setState(prev => {
      const nextId = moduleId + 1;
      const isFinished = nextId > 5;
      
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        moduleScores: { ...prev.moduleScores, [moduleId]: score },
        unlockedKeys: newKeys,
        currentModuleId: isFinished ? 5 : nextId,
        view: isFinished ? 'final' : 'learning',
        profile: newProfile
      };
    });
  };

  const renderContent = () => {
    switch (state.view) {
      case 'intake':
        return <IntakeForm onComplete={handleIntakeComplete} />;
      case 'diagnostic':
        return <Diagnostic onComplete={handleDiagnosticComplete} />;
      case 'learning':
        // Pass the track prop to all modules
        switch (state.currentModuleId) {
          case 1: return <Module1 onComplete={(s) => handleModuleComplete(1, s)} track={state.profile.track} />;
          case 2: return <Module2 onComplete={(s) => handleModuleComplete(2, s)} track={state.profile.track} />;
          case 3: return <Module3 onComplete={(s) => handleModuleComplete(3, s)} track={state.profile.track} />;
          case 4: return <Module4 onComplete={(s) => handleModuleComplete(4, s)} track={state.profile.track} />;
          case 5: return <Module5 onComplete={(s) => handleModuleComplete(5, s)} track={state.profile.track} />;
          default: return <div>Module not found</div>;
        }
      case 'final':
        return <FinalUnlock profile={state.profile} />;
      default:
        return <div>Error State</div>;
    }
  };

  return (
    <Layout appState={state} onExit={onExit}>
      {renderContent()}
    </Layout>
  );
};