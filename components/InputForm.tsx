import React, { useState } from 'react';
import type { CalculationInput, UserProfile } from '../types';
import { CalculationMode } from '../types';

interface InputFormProps {
  initialValues: UserProfile;
  onCalculate: (input: CalculationInput) => void;
  onSaveProfile: (input: CalculationInput) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ initialValues, onCalculate, onSaveProfile }) => {
  const [mode, setMode] = useState<CalculationMode>(CalculationMode.WakeToBed);
  const [age, setAge] = useState(initialValues.age);
  const [timeInput, setTimeInput] = useState('07:00');
  const [latency, setLatency] = useState(initialValues.latency);
  const [preferredWindowStart, setPreferredWindowStart] = useState(initialValues.preferredWindowStart);
  const [preferredWindowEnd, setPreferredWindowEnd] = useState(initialValues.preferredWindowEnd);
  const [habits, setHabits] = useState(initialValues.habits);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({ mode, age, timeInput, latency, preferredWindowStart, preferredWindowEnd, habits });
  };

  const handleSave = () => {
    onSaveProfile({ mode, age, timeInput, latency, preferredWindowStart, preferredWindowEnd, habits });
  };

  const isWakeToBed = mode === CalculationMode.WakeToBed;
  const pixelInputStyle = "mt-1 block w-full bg-cream border-2 border-dark-pixel rounded-md shadow-pixel-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mint-green text-dark-pixel placeholder-dark-pixel/50 appearance-none";
  const pixelCheckboxStyle = "h-5 w-5 rounded-sm border-2 border-dark-pixel bg-cream text-mint-green focus:ring-mint-green focus:ring-offset-soft-pink";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold font-pixel text-dark-pixel mb-2">CALCULATE MY...</label>
        <div className="relative grid grid-cols-2 gap-0 rounded-md border-2 border-dark-pixel overflow-hidden">
          <div className={`absolute top-0 bottom-0 w-1/2 h-full bg-baby-blue transition-transform duration-300 ease-in-out ${isWakeToBed ? 'translate-x-full' : 'translate-x-0'}`}></div>
          <button type="button" onClick={() => setMode(CalculationMode.BedtimeToWake)} className="relative px-4 py-3 text-sm font-bold font-pixel text-dark-pixel focus:outline-none">
            WAKE-UP TIME
          </button>
          <button type="button" onClick={() => setMode(CalculationMode.WakeToBed)} className="relative px-4 py-3 text-sm font-bold font-pixel text-dark-pixel focus:outline-none">
            BEDTIME
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="timeInput" className="block text-sm font-bold font-pixel text-dark-pixel">
            {isWakeToBed ? 'WAKE AT' : 'SLEEP AT'}
          </label>
          <input type="time" id="timeInput" value={timeInput} onChange={e => setTimeInput(e.target.value)} required className={pixelInputStyle} />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-bold font-pixel text-dark-pixel">
            AGE
          </label>
          <input type="number" id="age" value={age} onChange={e => setAge(parseInt(e.target.value, 10))} required min="6" max="100" className={pixelInputStyle} />
        </div>
      </div>
      
      <div>
        <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm font-pixel text-lavender hover:underline">
          {showAdvanced ? '[-]' : '[+]'} Optional Settings
        </button>
      </div>

      {showAdvanced && (
        <div className="space-y-4 border-t-2 border-dashed border-dark-pixel/50 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latency" className="block text-sm font-bold font-pixel text-dark-pixel">TIME TO SLEEP (MIN)</label>
                  <input type="number" id="latency" value={latency} onChange={e => setLatency(parseInt(e.target.value, 10))} min="0" max="60" className={pixelInputStyle} />
                </div>
                <div>
                    <label className="block text-sm font-bold font-pixel text-dark-pixel">PREF. WINDOW</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input type="time" value={preferredWindowStart} onChange={e => setPreferredWindowStart(e.target.value)} className={pixelInputStyle} />
                        <span className="font-pixel">to</span>
                        <input type="time" value={preferredWindowEnd} onChange={e => setPreferredWindowEnd(e.target.value)} className={pixelInputStyle} />
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="block text-sm font-bold font-pixel text-dark-pixel">HABITS</label>
                <div className="flex items-center">
                    <input id="caffeine" type="checkbox" checked={habits.caffeineLate} onChange={e => setHabits(h => ({ ...h, caffeineLate: e.target.checked }))} className={pixelCheckboxStyle} />
                    <label htmlFor="caffeine" className="ml-2 block text-sm text-dark-pixel">Caffeine after 2pm?</label>
                </div>
                <div className="flex items-center">
                    <input id="screens" type="checkbox" checked={habits.screensLate} onChange={e => setHabits(h => ({ ...h, screensLate: e.target.checked }))} className={pixelCheckboxStyle} />
                    <label htmlFor="screens" className="ml-2 block text-sm text-dark-pixel">Screens &lt;1h before bed?</label>
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-dashed border-dark-pixel/50">
        <button type="submit" className="w-full flex-1 justify-center items-center px-6 py-3 border-2 border-dark-pixel text-base font-bold font-pixel rounded-md shadow-pixel text-dark-pixel bg-mint-green hover:bg-opacity-80 active:shadow-none active:translate-x-1 active:translate-y-1">
          CALCULATE 💤
        </button>
        <button type="button" onClick={handleSave} className="w-full sm:w-auto justify-center items-center px-6 py-3 border-2 border-dark-pixel text-base font-bold font-pixel rounded-md shadow-pixel text-dark-pixel bg-lavender hover:bg-opacity-80 active:shadow-none active:translate-x-1 active:translate-y-1">
          SAVE
        </button>
      </div>
    </form>
  );
};