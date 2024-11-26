'use client';
import { chatSession } from "@/utils/AiModel";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { useEffect, useState } from "react";

// Interface for messages (if you want to define types)
interface Message {
  text: string;
  role: string | "user" | "bot";
  timestamp: Date;
}
interface Part {
  text: string;  // Assuming Part is an object with text property
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize the Gemini API client
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ?? "default_api_key"; 
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelParams = {
    model: "gemini-1.5-flash",  // Pass the model name within an object
  };
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  
  useEffect(() => {
    const initChat = async () => {
      try {
        // const model = "gemini-1.5-flash"; 
        const newChat = await genAI.getGenerativeModel(modelParams).startChat({
          generationConfig,
          safetySettings,
          history: messages.map((msg) => ({
            parts: [{ text: msg.text }],  // Correctly structure the parts array with an object
            role: msg.role,
          })),
        });
        setChat(newChat);
      } catch (error) {
        setError('Failed to initiate chat');
      }
    };
    initChat();
  }, []); // Only run on mount

  const handleSendMessage = async () => {
    if (!chat) {
      setError("Chat is not initialized yet.");
      return;
    }

    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      const result = await chatSession.sendMessage(userInput);  // Sending message to the model
      // console.log(result)
      const botMessage = {
        text: result.response.candidates[0].content.parts[0].text || "No response",  // Correct path to access the text
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setError("Failed to send message, please try again");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleResetPress = () => {
      setMessages([]);
  };

  return (
    <div className="chat-container">
    <div className="messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${msg.role === "user" ? "text-right user" : "text-left bot"}`}
        >
          {msg.text}
        </div>
      ))}
      {loading && (
        <div className="loading-indicator">
          <span>...</span> {/* You can use a spinner here */}
        </div>
      )}
    </div>
    {error && <div className="error">{error}</div>} {/* Display error message */}
    <div className="input-container">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={handleKeyPress}
        className="chat-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        {loading ? "Sending..." : "Send"}
      </button>
      <button onClick={handleResetPress} className="send-button">
        {loading ? "Reset..." : "Reset"}
      </button>
    </div>
  </div>
  );
}
