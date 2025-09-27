
import { AGE_RECOMMENDATIONS, DEFAULT_SLEEP_CYCLE_MINUTES } from '../constants';
import type { CalculationInput, CandidateTime, SleepRecommendation } from '../types';
import { CalculationMode } from '../types';

// --- Helper Functions ---

const timeToMinutes = (time: string): number => {
  if (!time || !time.includes(':')) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const totalMinutes = (minutes + 24 * 60) % (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

const getSleepRecommendation = (age: number): SleepRecommendation => {
  if (age >= 6 && age <= 13) return AGE_RECOMMENDATIONS['6-13'];
  if (age >= 14 && age <= 17) return AGE_RECOMMENDATIONS['14-17'];
  if (age >= 18 && age <= 25) return AGE_RECOMMENDATIONS['18-25'];
  if (age >= 26 && age <= 64) return AGE_RECOMMENDATIONS['26-64'];
  if (age >= 65) return AGE_RECOMMENDATIONS['65+'];
  return AGE_RECOMMENDATIONS['26-64']; // Default for out of range
};

// --- Main Calculation Logic ---

export const calculateSleepTimes = (input: CalculationInput): CandidateTime[] => {
  const { mode, age, timeInput, latency, preferredWindowStart, preferredWindowEnd, habits } = input;

  const recommendation = getSleepRecommendation(age);
  const R_min = recommendation.min * 60;
  const R_max = recommendation.max * 60;
  const R_mid = (R_min + R_max) / 2;

  const C = DEFAULT_SLEEP_CYCLE_MINUTES;
  const L = latency;

  const k_min = Math.ceil(R_min / C);
  const k_max = Math.floor(R_max / C);

  const timeInputMinutes = timeToMinutes(timeInput);
  const candidates: Omit<CandidateTime, 'isTopPick'>[] = [];

  for (let k = k_min; k <= k_max; k++) {
    const totalSleepMinutes = k * C;
    let resultTimeMinutes = 0;

    if (mode === CalculationMode.BedtimeToWake) {
      // Input is Bedtime B, find Wake time W
      // W = B + L + k*C
      resultTimeMinutes = timeInputMinutes + L + totalSleepMinutes;
    } else {
      // Input is Wake time W, find Bedtime B
      // B = W - L - k*C
      resultTimeMinutes = timeInputMinutes - L - totalSleepMinutes;
    }
    
    candidates.push({
      time: minutesToTime(resultTimeMinutes),
      cycles: k,
      totalSleep: totalSleepMinutes / 60,
      score: 0, // Will be calculated next
    });
  }

  // --- Scoring Logic ---

  const windowStartMinutes = timeToMinutes(preferredWindowStart);
  const windowEndMinutes = timeToMinutes(preferredWindowEnd);
  // Handle overnight window
  const windowSpan = (windowEndMinutes - windowStartMinutes + 24 * 60) % (24 * 60) || 24*60;

  const scoredCandidates = candidates.map(candidate => {
    const totalSleepMinutes = candidate.totalSleep * 60;
    
    // 1. Duration Score
    const durationDiff = Math.abs(totalSleepMinutes - R_mid);
    const durationRange = R_max - R_min;
    const durationScore = durationRange > 0 ? Math.max(0, 1 - durationDiff / durationRange) : 1;

    // 2. Window Score
    const candidateTimeMinutes = timeToMinutes(candidate.time);
    let minutesOutsideWindow = 0;
    let inWindow = false;

    if (windowStartMinutes < windowEndMinutes) { // Same day window
      inWindow = candidateTimeMinutes >= windowStartMinutes && candidateTimeMinutes <= windowEndMinutes;
      if (!inWindow) {
        minutesOutsideWindow = Math.min(
            Math.abs(candidateTimeMinutes - windowStartMinutes),
            Math.abs(candidateTimeMinutes - windowEndMinutes)
        );
      }
    } else { // Overnight window
      inWindow = candidateTimeMinutes >= windowStartMinutes || candidateTimeMinutes <= windowEndMinutes;
      if (!inWindow) {
        minutesOutsideWindow = Math.abs(candidateTimeMinutes - windowEndMinutes)
      }
    }

    const windowScore = inWindow ? 1 : Math.max(0, 1 - minutesOutsideWindow / (windowSpan / 2));
    
    // 3. Habits Penalty
    let habitsPenalty = 0;
    if (habits.caffeineLate) habitsPenalty += 0.05;
    if (habits.screensLate) habitsPenalty += 0.05;

    // Final Score
    const score = (0.6 * durationScore) + (0.35 * windowScore) - habitsPenalty;
    
    return { ...candidate, score };
  });

  // --- Ranking Logic ---
  
  scoredCandidates.sort((a, b) => b.score - a.score);

  if (scoredCandidates.length === 0) return [];

  const topPickScore = scoredCandidates[0].score;
  const topPicks = scoredCandidates.filter(c => c.score === topPickScore);

  // Break ties by proximity to the start of the preferred window
  topPicks.sort((a, b) => {
    const aDiff = Math.abs(timeToMinutes(a.time) - windowStartMinutes);
    const bDiff = Math.abs(timeToMinutes(b.time) - windowStartMinutes);
    return aDiff - bDiff;
  });

  const finalTopPickTime = topPicks[0].time;
  
  return scoredCandidates.map(c => ({
      ...c,
      isTopPick: c.time === finalTopPickTime,
  })).sort((a,b) => timeToMinutes(a.time) - timeToMinutes(b.time));
};
