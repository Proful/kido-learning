import { useEffect, useState } from "react"
import { loadScores, saveScores } from "../backend/core"
import { Answer, Feature, Scores } from "./types"

const initScores: Scores = {
  [Feature.Clock]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.Multiplication]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.Division]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.AddSub]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.TimesTable]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
}

const isEmpty = (scores: Scores) => {
  return Object.values(scores).every(
    (score) => score[Answer.Correct] === 0 && score[Answer.Incorrect] === 0
  )
}

const useScores = (): [Scores, (feature: Feature, answer: Answer) => void] => {
  const [scores, setScores] = useState<Scores>(initScores)

  useEffect(() => {
    loadScores().then(setScores)
  }, [])

  useEffect(() => {
    if (!isEmpty(scores)) {
      //BUG: redundant write first time
      saveScores(scores)
    }
  }, [scores])

  const updateScores = (feature: Feature, answer: Answer) => {
    setScores({
      ...scores,
      [feature]: {
        ...scores[feature],
        [answer]: scores[feature][answer] + 1,
      },
    })
  }

  return [scores, updateScores]
}

export default useScores
