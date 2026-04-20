import { useState, useCallback } from 'react';
import { askGemini } from '../services/geminiService';

export function useRecommendation() {
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendation = useCallback(async (crowdData, goal) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await askGemini(crowdData, goal);
      setRecommendation(result);
    } catch (err) {
      setError("Failed to generate recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { recommendation, isLoading, error, getRecommendation };
}
