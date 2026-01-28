
import { GoogleGenAI } from "@google/genai";

// Standard charity bot for the mobile-like home view
export const askCharityBot = async (query: string) => {
  try {
    // Initializing right before use as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "你现在是'乐善市南'慈善平台的公益助手。请以亲切、专业且透明的态度回答用户关于捐款去向、政策解读及项目详情的问题。回答要简洁，多使用鼓励公益的话语。",
      }
    });
    // Accessing .text property directly (not a method)
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "抱歉，我正在整理最新的公益数据，请稍后再试。";
  }
};

// Advanced assistant for the Lumina pro-dashboard
export const chatWithGemini = async (query: string, history: { role: string; content: string }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Map history to the required format for generateContent (user/model)
    const contents = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));
    
    // Add the current user query to the contents array
    contents.push({ role: 'user', parts: [{ text: query }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for complex text tasks as per guidelines
      contents: contents,
      config: {
        systemInstruction: "You are Lumina, an advanced AI assistant powered by Gemini 3 Pro. Provide insightful, accurate, and professional help.",
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "I encountered an issue processing your request. Please try again.";
  }
};

// Creative engine for image generation
export const generateImageWithGemini = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Default image generation model
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    // Find the image part in candidates as it might not be the first part
    if (response.candidates && response.candidates[0].content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image part found in response");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
