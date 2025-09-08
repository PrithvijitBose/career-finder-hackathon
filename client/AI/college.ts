// types/college.ts
export interface CollegeInfo {
  [key: string]: string;
}

export interface CollegeResult {
  content: string;
  similarity_score: number;
  parsed_info: CollegeInfo;
}

export interface SearchResponse {
  results: CollegeResult[];
  total_found: number;
  query: string;
}

export interface AIResponse {
  answer: string;
  query: string;
  colleges_used: number;
}

export type SearchMode = 'search' | 'ai';



