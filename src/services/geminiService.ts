/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { EmployeeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getHRInsights(data: EmployeeData[]) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI Insights are currently unavailable. Please configure your GEMINI_API_KEY in the secrets menu.";
  }

  // Sample the data to avoid token limits for very large datasets
  const sample = data.slice(0, 10).map(d => ({
    name: d.name,
    dept: d.department,
    perf: d.performanceScore,
    attendance: d.attendanceStatus,
    achievement: d.achievementPercentage,
    salary: d.salary,
    exp: d.yearsOfExperience
  }));

  const prompt = `
    You are an expert HR Analyst. Analyze the following employee data and provide 3-4 professional strategic insights.
    Focus on:
    1. Identifying top departments for high ROI.
    2. Flagging potential attrition risks (low score + high absence).
    3. Spotting "Rising Stars" (low experience but high performance).
    4. Recommendations for training or retention.

    Data Sample (JSON):
    ${JSON.stringify(sample, null, 2)}

    Keep the response concise, formatted in markdown bullets, and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI insights. Please try again later.";
  }
}
