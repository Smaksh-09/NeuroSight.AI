import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { roboflowData } = await req.json();

    const prompt = `
      You are a dermatology specialist analyzing skin images for potential cancer detection.
      
      Target Audience: Patients seeking skin cancer screening
      Context: Analysis of skin lesions and abnormalities for early cancer detection
      
      Analyze the following detection results and provide a structured response:
      ${JSON.stringify(roboflowData)}
      
      If no detections are present, start with:
      "No concerning lesions detected"
      
      If detections are present, start with:
      "Potential abnormality detected - Medical evaluation recommended"
      
      Then, structure the response with these sections:
      
      Analysis Summary:
      [Provide a brief, clear overview of what was found or not found]
      
      Characteristics:
      [If detected, describe the visual characteristics of the lesion(s). If none, describe what a healthy skin presentation looks like]
      
      Recommendations:
      [Specific, actionable next steps - focus on positive, proactive measures]
      
      Prevention Tips:
      [Include practical skin health maintenance advice, focusing on prevention]
      
      Format each section with a clear heading followed by a colon and the content.
      Keep the tone informative but reassuring, and focus on actionable information.
      Avoid repetitive medical disclaimers.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ result: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analysis:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze the skin image' }),
      { status: 500 }
    );
  }
} 