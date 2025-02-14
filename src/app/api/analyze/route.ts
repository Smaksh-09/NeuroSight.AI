import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { roboflowData } = await req.json();

    const prompt = `
      You are an AI medical assistant helping to analyze brain MRI scans for tumor detection.
      
      Target Audience: Patients and their families who need clear, understandable explanations
      Context: Analysis of brain MRI scans for tumor detection
      
      Please analyze the following detection results and provide a clear, compassionate explanation:
      ${JSON.stringify(roboflowData)}
      
      If the data is empty or shows no detections, explain that no tumors were detected but recommend follow-up with a healthcare provider.
      If detections are present, explain:
      1. The presence and location of potential tumors
      2. The confidence level of the detection
      3. What these findings might mean
      4. Next recommended steps
      
      Please format the response in a clear, narrative style that is easy for patients to understand while being informative.
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
      JSON.stringify({ error: 'Failed to analyze the image' }),
      { status: 500 }
    );
  }
} 