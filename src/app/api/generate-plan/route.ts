import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const sections = parseResponse(text);
    return Response.json(sections);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}

function parseResponse(text: string) {
  // Initialize sections
  const sections: { [key: string]: string } = {
    mealPlan: '',
    nutritionAdvice: '',
    exerciseRecommendations: '',
    lifestyleChanges: '',
    supplementation: ''
  };

  // Define section markers
  const sectionMarkers = {
    mealPlan: ['1. Meal Plan:', '2. Nutrition'],
    nutritionAdvice: ['2. Nutrition Advice:', '3. Exercise'],
    exerciseRecommendations: ['3. Exercise Recommendations:', '4. Lifestyle'],
    lifestyleChanges: ['4. Lifestyle Changes:', '5. Supplementation'],
    supplementation: ['5. Supplementation:', '\n\n']
  };

  // Extract content for each section
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