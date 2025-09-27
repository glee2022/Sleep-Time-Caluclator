import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculateSleepTimes } from './services/sleepCalculator';
import type { CalculationInput, CandidateTime, UserProfile } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Icon } from './components/Icon';

interface CalculationResult {
  input: CalculationInput;
  results: CandidateTime[];
}

const App: React.FC = () => {
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [view, setView] = useState<'form' | 'results'>('form');
  const [profile, setProfile] = useLocalStorage<UserProfile>('sleep-sync-profile', {
    age: 25,
    latency: 15,
    preferredWindowStart: '06:30',
    preferredWindowEnd: '07:30',
    habits: { caffeineLate: false, screensLate: false },
  });

  const handleCalculate = useCallback((input: CalculationInput) => {
    const calculatedTimes = calculateSleepTimes(input);
    setCalculation({ input, results: calculatedTimes });
    setView('results');
  }, []);

  const handleSaveProfile = useCallback((input: CalculationInput) => {
    setProfile({
      age: input.age,
      latency: input.latency,
      preferredWindowStart: input.preferredWindowStart,
      preferredWindowEnd: input.preferredWindowEnd,
      habits: input.habits,
    });
    alert('Profile saved as default!');
  }, [setProfile]);

  const handleBack = useCallback(() => {
    setView('form');
    setCalculation(null);
  }, []);

  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center gap-4">
            <Icon name="moon" className="text-lavender" />
            <h1 className="text-4xl sm:text-5xl font-pixel text-dark-pixel tracking-wider">
              Sleep Sync
            </h1>
            <Icon name="sun" className="text-gold-star" />
        </div>
        <p className="text-dark-pixel/80 mt-2 text-lg">
          Wake up refreshed, at the end of a sleep cycle.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <div className="bg-soft-pink rounded-lg shadow-pixel border-2 border-dark-pixel p-6 sm:p-8 transition-all duration-500">
          {view === 'form' ? (
            <InputForm
              initialValues={profile}
              onCalculate={handleCalculate}
              onSaveProfile={handleSaveProfile}
            />
          ) : (
            calculation && <ResultsDisplay results={calculation.results} input={calculation.input} onBack={handleBack} />
          )}
        </div>
        <footer className="text-center mt-8 text-dark-pixel/50 text-sm font-pixel">
            <p>&copy; {new Date().getFullYear()} Sleep Sync</p>
        </footer>
      </main>
    </div>
  );
};

export default App;