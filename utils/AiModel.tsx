const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    export async function sendMessageToChat(message: any) {
      try {
        const response = await chatSession.sendMessage({ content: message });
        return response; // The response from the model
      } catch (error) {
        console.error("Error sending message to chat:", error);
        throw error;
      }
    }