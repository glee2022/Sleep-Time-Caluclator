
export enum CalculationMode {
  BedtimeToWake = 'BEDTIME_TO_WAKE',
  WakeToBed = 'WAKE_TO_BED',
}

export interface Habits {
  caffeineLate: boolean;
  screensLate: boolean;
}

export interface CalculationInput {
  mode: CalculationMode;
  age: number;
  timeInput: string; // HH:mm format
  latency: number; // in minutes
  preferredWindowStart: string; // HH:mm format
  preferredWindowEnd: string; // HH:mm format
  habits: Habits;
}

export interface UserProfile {
  age: number;
  latency: number;
  preferredWindowStart: string;
  preferredWindowEnd: string;
  habits: Habits;
}

export interface SleepRecommendation {
  min: number; // in hours
  max: number; // in hours
}

export interface CandidateTime {
  time: string; // HH:mm format
  cycles: number;
  totalSleep: number; // in hours
  score: number;
  isTopPick: boolean;
}
