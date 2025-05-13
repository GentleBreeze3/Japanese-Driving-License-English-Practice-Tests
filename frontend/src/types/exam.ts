export interface Question {
  id: number;
  text: string;
  isTrue: boolean;
  explanation?: string;
  imageUrl?: string;
  hint?: string;
}

export interface ExamSet {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface ExamResult {
  examSetId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
  date: string;
} 