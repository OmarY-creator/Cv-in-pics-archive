export type AppView = 'intake' | 'diagnostic' | 'learning' | 'final';

export type UserUseCase = 'writing' | 'analysis' | 'coding' | 'research' | 'customer_service';
export type UserWorkStyle = 'structured' | 'flexible' | 'balanced';
export type UserRiskTolerance = 'cautious' | 'moderate' | 'experimental';
export type ProficiencyTrack = 'foundation' | 'practitioner' | 'advanced';

export interface UserProfile {
  name: string;
  primaryUseCase: UserUseCase;
  workStyle: UserWorkStyle;
  riskTolerance: UserRiskTolerance;
  track: ProficiencyTrack;
  
  // Computed scores
  technicalComfort: number;
  prefersPrecision: boolean;
  prefersCreativity: boolean;
  securityConscious: number;
}

export interface AppState {
  view: AppView;
  currentModuleId: number;
  completedModules: number[]; // IDs of completed modules
  moduleScores: Record<number, number>;
  unlockedKeys: boolean[]; // Array of 5 booleans for the 5 keys
  profile: UserProfile;
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  feedback: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
