export type ChildrenType = "ChoiceHorizontal" | "ChoiceVertical";

export interface ChildItem {
  title: string;
  description: string;
  iconSrc: string;
}

export interface Question {
  step: number;
  category: string; 
  question: string;
  ChildrenType: ChildrenType;
  children: ChildItem[];
}

export interface Section {
  title: string;
  questions: Question[];
}

export interface SubmissionResponse {
  id: number;
  hourlyRate: number;
  designerHours: number;
  developerHours: number;
  totalHours: number;
  budget: number;
  createdAt: string;
  answers: Record<string, string[]>;
}
