import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { originalText, prompt } = await req.json();

    if (!originalText || !prompt) {
      return NextResponse.json(
        { error: 'Missing originalText or prompt' },
        { status: 400 }
      );
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      // Mock response for testing the UI without an API key
      console.warn("No GEMINI_API_KEY found. Returning mock response.");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        result: `[MOCK AI EDIT]: Applied "${prompt}" to "${originalText}"`,
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = `You are an expert copywriter and editor built into an image-editing tool.
Your job is to modify the provided text according to the user's prompt. 
IMPORTANT RULES:
- ONLY return the final edited text. Do not include quotes around the output unless they are part of the text itself.
- Do not include conversational filler like "Here is the result:".
- Preserve the general tone and capitalization if the prompt doesn't specify otherwise.`;

    const userMessage = `Original Text: ${originalText}
Action to apply: ${prompt}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    const resultText = response.text?.trim() || "";

    return NextResponse.json({ result: resultText });
  } catch (error: any) {
    console.error('AI Edit Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process AI Edit' },
      { status: 500 }
    );
  }
}
