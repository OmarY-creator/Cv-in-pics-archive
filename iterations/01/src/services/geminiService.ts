import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "AI Coach" for the "AI Teacher" educational portfolio. 
Your goal is to help students understand AI concepts like Tokens, Temperature, Prompting (CRISP framework), Web-Grounding, and Data Security.
Keep answers brief (under 3 sentences), encouraging, and pedagogical.
Do not write code unless asked.
Tone: Professional, supportive, and slightly futuristic.
`;

let client: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in environment variables.");
    return null;
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const sendMessageToCoach = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const ai = initializeGemini();
  if (!ai) {
    return "I'm currently offline (Missing API Key). Please check configuration.";
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the neural network right now.";
  }
};
