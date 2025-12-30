
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, PriceData, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const performMarketAnalysis = async (): Promise<AnalysisResult> => {
  const prompt = `
    Perform a comprehensive competitive pricing analysis for 'IconInc The Bonnie' in Glasgow.
    Find current pricing for IconInc The Bonnie Glasgow and compare it with the following specific competitors in Glasgow:
    - Vita Glasgow – West End
    - Canvas Student
    - Derwent Student
    - Student Roost
    - Social Hub
    - Aparto
    - Clifton & Stewart House
    - Capitol Students
    
    For each competitor, find the most comparable luxury studio or apartment room type and its current weekly price (GBP).
    
    Return the data in a structured format suitable for visualization.
    Specifically:
    1. A detailed executive summary of how IconInc The Bonnie's pricing and value proposition compares against these specific rivals.
    2. A list of room types and their weekly prices for IconInc and every competitor mentioned.
    
    Ensure the response is detailed, accurate, and utilizes real-time search data via Google Search grounding.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            comparisonData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  propertyName: { type: Type.STRING },
                  roomType: { type: Type.STRING },
                  pricePerWeek: { type: Type.NUMBER },
                  isIconInc: { type: Type.BOOLEAN },
                  amenities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  }
                },
                required: ["propertyName", "roomType", "pricePerWeek", "isIconInc"]
              }
            }
          },
          required: ["summary", "comparisonData"]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text.trim());
    
    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri
      }));

    return {
      summary: data.summary,
      comparisonData: data.comparisonData,
      sources: sources
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
