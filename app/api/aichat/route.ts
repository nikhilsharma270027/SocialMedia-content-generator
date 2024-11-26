import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Gemini API client
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ?? "default_api_key"; // Uses fallback only if undefined or null

const genAI = new GoogleGenerativeAI(apiKey);

// Get the model (ensure the model name is correct, like "gemini-1.5-flash")
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Initialize the chat session (empty history initially)
const chatSession = model.startChat({
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
  history: [],
});

// POST handler for AI chat interaction
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming message
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const aimessage  = JSON.stringify(message)

    // Send message to the AI chat session
    const response = await chatSession.sendMessage(aimessage);
    {/* @ts-ignore */} 
// console.log(response?.text)
    // Return the response from the AI
    {/* @ts-ignore */} 
    if (response) {
      {/* @ts-ignore */} 
      return NextResponse.json({ text: response });
    } else {
      return NextResponse.json({ error: "AI did not respond correctly" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error with AI service:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
