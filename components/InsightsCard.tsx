import React from 'react';
import { AGE_RECOMMENDATIONS } from '../constants';
import { Icon } from './Icon';

interface InsightsCardProps {
  age: number;
}

const getInsight = (age: number) => {
  let recommendation = '';
  if (age >= 6 && age <= 13) recommendation = `${AGE_RECOMMENDATIONS['6-13'].min}–${AGE_RECOMMENDATIONS['6-13'].max} hours`;
  else if (age >= 14 && age <= 17) recommendation = `${AGE_RECOMMENDATIONS['14-17'].min}–${AGE_RECOMMENDATIONS['14-17'].max} hours`;
  else if (age >= 18 && age <= 64) recommendation = `${AGE_RECOMMENDATIONS['18-25'].min}–${AGE_RECOMMENDATIONS['18-25'].max} hours`;
  else if (age >= 65) recommendation = `${AGE_RECOMMENDATIONS['65+'].min}–${AGE_RECOMMENDATIONS['65+'].max} hours`;
  else recommendation = `7–9 hours`;

  return `For your age, ${recommendation} is optimal. Sticking to a consistent schedule, even on weekends, can significantly improve sleep quality.`;
};


export const InsightsCard: React.FC<InsightsCardProps> = ({ age }) => {
  const insightText = getInsight(age);

  return (
    <div className="relative bg-lavender rounded-lg p-4 border-2 border-dark-pixel shadow-pixel mt-6">
       {/* Speech bubble tail */}
       <div className="absolute left-8 -top-2 w-4 h-4 bg-lavender border-t-2 border-l-2 border-dark-pixel transform rotate-45"></div>

       <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-dark-pixel mt-1">
                <Icon name="info" />
            </div>
            <div>
                <h4 className="font-bold font-pixel text-dark-pixel">SLEEP TIP</h4>
                <p className="text-sm text-dark-pixel/90 mt-1">{insightText}</p>
            </div>
       </div>
    </div>
  );
};