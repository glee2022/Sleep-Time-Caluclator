import React from 'react';
import type { CandidateTime, CalculationInput } from '../types';
import { TimeCard } from './TimeCard';
import { InsightsCard } from './InsightsCard';

interface ResultsDisplayProps {
  results: CandidateTime[];
  input: CalculationInput;
  onBack: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, input, onBack }) => {
  const topPick = results.find(r => r.isTopPick);
  const alternates = results.filter(r => !r.isTopPick);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-pixel text-dark-pixel text-center">OPTIMAL TIMES</h2>
        <p className="text-center text-dark-pixel/70 mt-1">Based on 90-minute sleep cycles.</p>
      </div>
      
      <div className="space-y-4">
        {topPick && (
          <div>
            <h3 className="text-sm font-bold font-pixel uppercase text-dark-pixel tracking-wider mb-2">⭐ TOP PICK</h3>
            <TimeCard time={topPick} input={input} />
          </div>
        )}

        {alternates.length > 0 && (
          <div>
            <h3 className="text-sm font-bold font-pixel uppercase text-dark-pixel/60 tracking-wider mb-2">ALTERNATIVES</h3>
            <div className="space-y-3">
                {alternates.map(time => (
                    <TimeCard key={time.time} time={time} input={input} />
                ))}
            </div>
          </div>
        )}
      </div>

      {topPick && <InsightsCard age={input.age} />}

      <div className="pt-6 border-t-2 border-dashed border-dark-pixel/50 text-center">
        <button onClick={onBack} className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-3 border-2 border-dark-pixel text-base font-bold font-pixel rounded-md shadow-pixel text-dark-pixel bg-lavender hover:bg-opacity-80 active:shadow-none active:translate-x-1 active:translate-y-1">
          &lt; BACK
        </button>
      </div>
    </div>
  );
};