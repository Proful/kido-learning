import { invoke } from "@tauri-apps/api"
import { QuizOption, Scores } from "../shared/types"

const getQuizOptions = async (): Promise<QuizOption[]> => {
  const result = (await invoke("gen_quiz_options")) as QuizOption[]

  return result
}

const loadScores = async (): Promise<Scores> => {
  const result = (await invoke("load_scores")) as Scores

  return result
}

const saveScores = async (scores: Scores) => {
  await invoke("save_scores", { scores: scores })
}

export { getQuizOptions, loadScores, saveScores }
