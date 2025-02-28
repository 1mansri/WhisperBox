import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST() {
  try {
    // Prepare the prompt
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Create a model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedQuestions = response.text();

    return NextResponse.json({ 
      success: true, 
      questions: generatedQuestions 
    });
  } catch (error) {
    console.error('AI request failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate questions' 
      },
      { status: 500 }
    );
  }
}