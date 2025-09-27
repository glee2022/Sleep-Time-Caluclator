import React from 'react';
import { CalculationMode, type CandidateTime, type CalculationInput } from '../types';
import { Icon } from './Icon';

interface TimeCardProps {
  time: CandidateTime;
  input: CalculationInput;
}

export const TimeCard: React.FC<TimeCardProps> = ({ time, input }) => {
  const { time: displayTime, cycles, totalSleep, isTopPick } = time;

  const handleAddToCalendar = () => {
    const { mode, timeInput } = input;
    const { time: calculatedTime, totalSleep } = time;

    let bedtime: string;
    let waketime: string;
    let eventTitle: string;
    let eventTime: string;

    if (mode === CalculationMode.WakeToBed) {
      bedtime = calculatedTime;
      waketime = timeInput;
      eventTitle = 'Time for Bed 🛌';
      eventTime = bedtime;
    } else {
      bedtime = timeInput;
      waketime = calculatedTime;
      eventTitle = 'Time to Wake Up! ☀️';
      eventTime = waketime;
    }

    const eventDateTime = new Date();
    const [hours, minutes] = eventTime.split(':').map(Number);
    eventDateTime.setHours(hours, minutes, 0, 0);

    if (eventDateTime < new Date()) {
      eventDateTime.setDate(eventDateTime.getDate() + 1);
    }

    const startTime = eventDateTime.toISOString().replace(/-|:|\.\d+/g, '');
    const endDateTime = new Date(eventDateTime.getTime() + 15 * 60 * 1000);
    const endTime = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

    const description = `Based on ${cycles} sleep cycles for a total of ${totalSleep.toFixed(1)} hours of sleep.\n\nBedtime: ${bedtime}\nWake-up Time: ${waketime}\n\nOptimized by Sleep Sync.`;

    const calendarUrl = [
      'https://www.google.com/calendar/render?action=TEMPLATE',
      `&text=${encodeURIComponent(eventTitle)}`,
      `&dates=${startTime}/${endTime}`,
      `&details=${encodeURIComponent(description)}`,
    ].join('');

    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  };
  
  const cardBg = isTopPick ? 'bg-gold-star' : 'bg-cream';
  
  return (
    <div className={`rounded-lg p-4 border-2 border-dark-pixel shadow-pixel ${cardBg}`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex-1 mb-4 sm:mb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold font-pixel text-dark-pixel">{displayTime}</span>
            {isTopPick && <Icon name="star" className="text-dark-pixel animate-blink" />}
          </div>
          <div className="text-sm text-dark-pixel/80 mt-1 font-pixel">
            <span>{cycles} cycles</span>
            <span className="mx-2">&bull;</span>
            <span>{totalSleep.toFixed(1)}h sleep</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleAddToCalendar} title="Add to Calendar" className="p-2 rounded-md border-2 border-dark-pixel bg-baby-blue hover:bg-opacity-80 shadow-pixel-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
                <Icon name="calendar" />
            </button>
            <button onClick={() => alert('Set Routine is coming soon!')} title="Set Routine" className="p-2 rounded-md border-2 border-dark-pixel bg-baby-blue hover:bg-opacity-80 shadow-pixel-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
                <Icon name="repeat" />
            </button>
        </div>
      </div>
    </div>
  );
};