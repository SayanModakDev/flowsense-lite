const getApiUrl = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return key
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent?key=${key}`
    : null;
};

export const askGemini = async (crowdData, goal) => {
  const apiUrl = getApiUrl();

  // Rule-based filtering: Identify relevant zones BEFORE calling AI
  const relevantZones = crowdData.filter(z => 
    z.type.toLowerCase().includes(goal.toLowerCase()) || 
    goal.toLowerCase().includes(z.type.toLowerCase())
  );
  
  if (!relevantZones.length) {
    return {
      recommendation: "Check closest directory",
      waitTime: "Unknown",
      reason: "Could not find specific facilities for your request. Please follow stadium signage."
    };
  }

  if (!apiUrl) {
    console.warn("No Gemini API key found. Using fallback routing.");
    return getFallbackRecommendation(relevantZones);
  }

  const prompt = `
    You are an AI assistant for a stadium crowd management app.
    The user is looking for the best option for: ${goal}.
    
    Here are the ONLY available zones that match this goal (JSON array):
    ${JSON.stringify(relevantZones)}
    
    INSTRUCTIONS:
    1. Select the SINGLE best zone from the provided list with the lowest crowding relative to capacity.
    2. Estimate a short wait time based on capacity vs current count.
    3. Respond STRICTLY with the following JSON format. Do not use Markdown backticks. Do not include any extra text.

    {
      "recommendation": "Exact name of best zone",
      "waitTime": "Estimated wait time (e.g. '~5 min')",
      "reason": "Short, engaging explanation why this is the best pick."
    }
  `;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    
    // Clean up potential markdown markers before parsing
    const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackRecommendation(relevantZones);
  }
};

const getFallbackRecommendation = (relevantZones) => {
  // Sort by lowest density percentage
  const bestZone = [...relevantZones].sort((a, b) => {
     const pA = a.currentCount / a.capacity;
     const pB = b.currentCount / b.capacity;
     return pA - pB;
  })[0];

  const density = (bestZone.currentCount / bestZone.capacity) * 100;
  
  // Dummy wait time scaling
  let waitMin = 2; 
  if (density > 30) waitMin = 5;
  if (density > 60) waitMin = 10;
  if (density > 85) waitMin = 20;

  return {
    recommendation: bestZone.name,
    waitTime: `~${waitMin} mins`,
    reason: `Local fallback: Based on offline analytics, this is the least crowded option at ${Math.round(density)}% capacity.`
  };
};
