import { AppShell, Header, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { loadScores, saveScores } from "./backend/core"
import FeatureRenderer from "./components/features/FeatureRenderer"
import Navbar from "./components/Navbar"
import { Feature, Scores, Answer } from "./types"

const initScores: Scores = {
  [Feature.Clock]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.Multiplication]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
  [Feature.Division]: { [Answer.Correct]: 0, [Answer.Incorrect]: 0 },
}

const isEmpty = (scores: Scores) => {
  return Object.values(scores).every(
    (score) => score[Answer.Correct] === 0 && score[Answer.Incorrect] === 0
  )
}

const App = () => {
  const [feature, setFeature] = useState<Feature>(Feature.Clock)
  const [scores, setScores] = useState<Scores>(initScores)
  const [seed, setSeed] = useState<number>(0)

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

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          onFeatureSelected={(feature) => {
            setFeature(feature)
            setSeed(Math.random())
          }}
        />
      }
      header={
        <Header height={60} p="xs">
          <Title order={6}>Kido Learning</Title>
        </Header>
      }
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.dark[6],
          color: theme.colors.gray[2],
        },
      })}
    >
      <FeatureRenderer {...{ feature, seed, scores, updateScores }} />
    </AppShell>
  )
}

export default App
