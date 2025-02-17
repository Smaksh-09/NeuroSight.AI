import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { roboflowData } = await req.json();

    const prompt = `
      You are an AI medical assistant helping to analyze lung scans for tumor detection.
      
      Target Audience: Patients and their families who need clear, understandable explanations
      Context: Analysis of lung scans for potential tumors and cancer detection
      
      Please analyze the following detection results and provide a clear, compassionate explanation:
      ${JSON.stringify(roboflowData)}
      
      If the data is empty or shows no detections, please explain that:
      - No tumors were detected in the lung scan
      - This is a positive finding but regular check-ups are still important
      - Recommend follow-up with a healthcare provider for comprehensive evaluation
      
      If detections are present, please explain:
      1. The location and characteristics of potential tumors
      2. The confidence level of the detection
      3. What these findings might indicate (in patient-friendly terms)
      4. The importance of prompt medical consultation
      5. Next recommended steps
      
      Additional notes to include:
      - Emphasize that this is an AI-assisted analysis and not a final diagnosis
      - Mention the importance of professional medical evaluation
      - Include general lung health recommendations
      - Do not include * in the response
      Do not include ** in the response.
      Please format the response in a clear, compassionate narrative style that is easy for patients to understand while being informative.
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
      JSON.stringify({ error: 'Failed to analyze the lung scan' }),
      { status: 500 }
    );
  }
} 