export interface QuizOption {
  value: string
  label: string
}
export enum Answer {
  Correct = "correct",
  Incorrect = "incorrect",
}
export interface Count {
  [Answer.Correct]: number
  [Answer.Incorrect]: number
}
export enum Feature {
  Clock = "clock",
  Multiplication = "multiplication",
  Division = "division",
  Addition = "addition",
}
export interface Scores {
  [Feature.Clock]: Count
  [Feature.Multiplication]: Count
  [Feature.Division]: Count
  [Feature.Addition]: Count
}
export interface Settings {
  denominator: number
  operation: string
}
