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
  AddSub = "addsub",
  TimesTable = "timestable",
  Fraction = "fraction",
}
export interface Scores {
  [Feature.Clock]: Count
  [Feature.Multiplication]: Count
  [Feature.Division]: Count
  [Feature.AddSub]: Count //not used
  [Feature.TimesTable]: Count //not used
  [Feature.Fraction]: Count //not used
}
export interface Settings {
  denominator: number
  operation: string
}
