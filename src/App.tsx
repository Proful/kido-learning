import { AppShell, Header, Title, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { loadScores, saveScores } from "./backend/core";
import Division from "./components/features/Division";
import MagicClock from "./components/features/MagicClock";
import Multiplication from "./components/features/Multiplication";
import Navbar from "./components/Navbar";
import { Features, Feature, Scores, Answer } from "./types";

const initFeatures: Features = {
  [Feature.Clock]: 0,
  [Feature.Multiplication]: 0,
  [Feature.Division]: 0,
};

const initScores: Scores = {
  [Feature.Clock]: { correct: 0, incorrect: 0 },
  [Feature.Multiplication]: { correct: 0, incorrect: 0 },
  [Feature.Division]: { correct: 0, incorrect: 0 },
};

const isEmpty = (scores: Scores) => {
  return Object.values(scores).every(
    (score) => score.correct === 0 && score.incorrect === 0
  );
};

const App = () => {
  const [features, setFeatures] = useState<Features>(initFeatures);
  const [scores, setScores] = useState<Scores>(initScores);

  useEffect(() => {
    console.log("read from file");
    loadScores().then(setScores);
  }, []);

  useEffect(() => {
    console.log("scores updates..", scores);
    if (!isEmpty(scores)) {
      //BUG: redundant write first time
      saveScores(scores);
    }
  }, [scores]);

  const updateScores = (feature: Feature, answer: Answer) => {
    setScores({
      ...scores,
      [feature]: {
        ...scores[feature],
        [answer]: scores[feature][answer] + 1,
      },
    });
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          onFeatureSelected={(feature) =>
            setFeatures({ ...initFeatures, [feature]: Math.random() })
          }
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
      {features[Feature.Clock] !== 0 && (
        <MagicClock
          render={features[Feature.Clock]}
          count={scores[Feature.Clock]}
          onAnswer={(answer) => updateScores(Feature.Clock, answer)}
        />
      )}
      {features[Feature.Multiplication] !== 0 && (
        <Multiplication
          render={features[Feature.Multiplication]}
          count={scores[Feature.Multiplication]}
          onAnswer={(answer) => updateScores(Feature.Multiplication, answer)}
        />
      )}
      {features[Feature.Division] !== 0 && (
        <Division
          render={features[Feature.Division]}
          count={scores[Feature.Division]}
          onAnswer={(answer) => updateScores(Feature.Division, answer)}
        />
      )}
    </AppShell>
  );
};

export default App;
