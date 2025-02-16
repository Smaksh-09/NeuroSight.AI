import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const sections = parseResponse(text);
    return Response.json(sections);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to analyze symptoms' }, { status: 500 });
  }
}

function parseResponse(text: string) {
  const sections: { [key: string]: string } = {
    possibleConditions: '',
    recommendedActions: '',
    additionalTests: '',
    lifestyleRecommendations: '',
    warningSigns: ''
  };

  const sectionMarkers = {
    possibleConditions: ['1. Possible Conditions:', '2. Recommended'],
    recommendedActions: ['2. Recommended Actions:', '3. Additional'],
    additionalTests: ['3. Additional Tests:', '4. Lifestyle'],
    lifestyleRecommendations: ['4. Lifestyle Recommendations:', '5. Warning'],
    warningSigns: ['5. Warning Signs:', '\n\n']
  };

  Object.entries(sectionMarkers).forEach(([section, [startMarker, endMarker]]) => {
    const startIndex = text.indexOf(startMarker);
    if (startIndex !== -1) {
      const endIndex = text.indexOf(endMarker, startIndex + startMarker.length);
      const content = text.slice(
        startIndex + startMarker.length,
        endIndex !== -1 ? endIndex : undefined
      ).trim();
      sections[section] = content;
    }
  });

  return sections;
} 