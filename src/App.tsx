import { AppShell, Header, Title, Button } from "@mantine/core";
import { useState } from "react";
import Division from "./components/features/Division";
import MagicClock from "./components/features/MagicClock";
import Multiplication from "./components/features/Multiplication";
import Navbar from "./components/Navbar";
import { Features, Feature } from "./types";

const resetFeatures: Features = {
  [Feature.Clock]: 0,
  [Feature.Multiplication]: 0,
  [Feature.Division]: 0,
};

function App() {
  const [features, setFeatures] = useState<Features>(resetFeatures);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          onFeatureSelected={(feature) =>
            setFeatures({ ...resetFeatures, [feature]: Math.random() })
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
      {!!features[Feature.Clock] && (
        <MagicClock render={features[Feature.Clock]} />
      )}
      {!!features[Feature.Multiplication] && (
        <Multiplication render={features[Feature.Multiplication]} />
      )}
      {!!features[Feature.Division] && (
        <Division render={features[Feature.Division]} />
      )}
    </AppShell>
  );
}

export default App;
