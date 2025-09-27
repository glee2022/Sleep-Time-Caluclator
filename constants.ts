
import type { SleepRecommendation } from './types';

export const DEFAULT_SLEEP_CYCLE_MINUTES = 90;
export const DEFAULT_LATENCY_MINUTES = 15;

export const AGE_RECOMMENDATIONS: { [key: string]: SleepRecommendation } = {
  '6-13': { min: 9, max: 11 },
  '14-17': { min: 8, max: 10 },
  '18-25': { min: 7, max: 9 },
  '26-64': { min: 7, max: 9 },
  '65+': { min: 7, max: 8 },
};
