import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('report') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert File to Base64 for Gemini
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type;

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

    const prompt = `You are an expert medical professional analyzing a medical report.
      
      Please provide a detailed analysis of this medical report with the following structure:
      
      1. Key Findings:
         - List and explain the main medical findings
         - Highlight any abnormal values or concerning results
         
      2. Interpretation:
         - Explain what these findings mean in simple terms
         - Context for why certain values might be high/low
         
      3. Recommendations:
         - Specific lifestyle changes if applicable
         - Dietary suggestions based on the results
         - Exercise recommendations if relevant
         
      4. Follow-up Actions:
         - Suggested follow-up tests if needed
         - Timeframe for next check-up
         - Any urgent actions required
         
      5. Additional Notes:
         - General health maintenance advice
         - Preventive measures
         - Any other relevant information
      Do not include ** in the response.
      Please use simple language that patients can understand while maintaining medical accuracy.
      Limit response to 2500 characters.`;

    try {
      // Create image part for Gemini
      const imagePart = {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mimeType
        }
      };

      // Generate content with Gemini
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ result: text }, { status: 200 });

    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        { error: 'Failed to analyze with Gemini API' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error analyzing report:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze the report';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
