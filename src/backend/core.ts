import { invoke } from "@tauri-apps/api";
import { QuizOption } from "../types";

const getQuizOptions = async (): Promise<QuizOption[]> => {
  const result = (await invoke("gen_quiz_options")) as QuizOption[];

  return result;
};

export { getQuizOptions };
