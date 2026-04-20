import { useState } from 'react';
import { useCrowdData } from '../hooks/useCrowdData';
import { useRecommendation } from '../hooks/useRecommendation';
import Button from '../components/ui/Button';
import RecommendationCard from '../components/RecommendationCard';

export default function RecommendPage() {
  const { zones } = useCrowdData();
  const { recommendation, isLoading, error, getRecommendation } = useRecommendation();
  const [selectedGoal, setSelectedGoal] = useState('restroom');

  const handleAskAI = () => {
    getRecommendation(zones, selectedGoal);
  };

  return (
    <div className="max-w-md mx-auto h-full flex flex-col px-2 py-4 text-left">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-(--accent) rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-xl">🪄</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-(--text-h) m-0 tracking-tight">AI Navigator</h1>
            <p className="text-[10px] font-bold text-(--text) opacity-40 uppercase tracking-[0.2em] leading-none">Powered by Gemini</p>
          </div>
        </div>
      </header>

      <div className="bg-(--accent-bg) p-4 rounded-2xl border border-(--accent-border) mb-6">
        <h3 className="font-black text-(--text-h) mb-3 text-[10px] uppercase tracking-[0.2em] mt-0">What are you looking for?</h3>
        <div className="flex flex-wrap gap-2">
          {['restroom', 'food', 'merch', 'exit'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedGoal(type)}
              className={`flex-1 py-3 px-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                selectedGoal === type 
                  ? 'bg-(--accent) text-white shadow-md shadow-purple-500/20 scale-[1.02]' 
                  : 'bg-(--bg) text-(--text) border border-(--border) hover:border-(--accent-border) hover:text-(--accent)'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleAskAI} isLoading={isLoading}>
        Find Best Option
      </Button>

      {error && <p className="text-rose-500 mt-4 text-center text-sm bg-rose-50 p-3 rounded-xl border border-rose-100">{error}</p>}
      
      {recommendation && <RecommendationCard recommendation={recommendation} />}
    </div>
  );
}
