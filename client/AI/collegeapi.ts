import axios from "axios";

export interface CollegeResult {
  content: string;
  similarity_score: number;
}

export interface AskResponse {
  results: CollegeResult[];
  answer?: string;
}

export const askCollege = async (query: string, mode: "search" | "ai"): Promise<AskResponse> => {
  const res = await axios.post<AskResponse>("http://localhost:8000/ask", { query, mode });
  return res.data;
};