export interface QuizOption {
  value: string;
  label: string;
}
export interface Count {
  correct: number;
  incorrect: number;
}
export enum Feature {
  Clock = "clock",
  Multiplication = "multiplication",
  Division = "division",
}
export interface Features {
  [Feature.Clock]: number;
  [Feature.Multiplication]: number;
  [Feature.Division]: number;
}
