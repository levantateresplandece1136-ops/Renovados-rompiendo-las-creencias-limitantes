/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OnboardingInfo {
  name: string;
  age: number;
  civilStatus: string;
  sex: string;
  mainArea: 'identidad' | 'finanzas' | 'relaciones' | 'matrimonio' | 'ministerio' | 'liderazgo' | 'ventas' | 'negocios' | 'proposito';
}

export type BeliefCategory =
  | 'identidad'
  | 'temor'
  | 'rechazo'
  | 'escasez'
  | 'comparacion'
  | 'perfeccionismo'
  | 'control'
  | 'ansiedad'
  | 'culpa'
  | 'verguenza';

export interface SurveyOption {
  text: string;
  category: BeliefCategory;
  score: number; // hidden scoring mapping intensity
}

export interface SurveyQuestion {
  id: number;
  text: string;
  options: {
    A: SurveyOption;
    B: SurveyOption;
    C: SurveyOption;
    D: SurveyOption;
  };
}

export interface TestResult {
  dominantBelief: BeliefCategory;
  secondaryBeliefs: BeliefCategory[];
  rootLie: string;
  intensity: 'Leve' | 'Moderada' | 'Alta' | 'Muy alta';
  scores: Record<BeliefCategory, number>;
  createdAt: string;
}

export interface BeliefVerse {
  reference: string;
  text: string;
}

export interface Belief {
  id: string; // e.g. "B1", "B2"
  name: string;
  category: BeliefCategory;
  fearRoot: string;
  mainEmotion: string;
  cognitiveDistortion: string;
  lie: string;
  truth: string;
  verses: BeliefVerse[];
  activities: string[];
}

export interface PlanDay {
  dayNum: number;
  objective: string;
  verse: string;
  verseText: string;
  reflection: string;
  activity: string;
  faithAction: string;
  prayer: string;
  completed: boolean;
  notes?: string;
  readVerse: boolean;
  doneActivity: boolean;
  reflected: boolean;
  prayed: boolean;
}

export interface PlanWeek {
  weekNum: number; // 1 to 4
  name: string; // Consciencia, Demolición, Renovación, Consolidación
  days: PlanDay[];
}

export interface HabitProgress {
  date: string; // YYYY-MM-DD
  readVerse: boolean;
  completedActivity: boolean;
  reflected: boolean;
  prayed: boolean;
  registeredAdvances: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'elias';
  text: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LibraryCategory {
  id: BeliefCategory;
  name: string;
  description: string;
  territoryName: string;
  verses: { reference: string; text: string; application: string }[];
}
