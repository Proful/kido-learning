import { AppShell, Header, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import FeatureRenderer from "./components/features/FeatureRenderer";
import Navbar from "./components/Navbar";
import useScores from "./shared/useScores";
import { Feature } from "./shared/types";
import Settings from "./components/Settings";
import { listen } from "@tauri-apps/api/event";

const App = () => {
  const [feature, setFeature] = useState<Feature>(Feature.Clock);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0); //Re-render the quiz options
  const [scores, updateScores, resetScores] = useScores();

  useEffect(() => {
    listen("reset_scores", () => {
      resetScores();
    }).then(() => {
      console.log("then reset scores");
    }).catch(() => {
      console.log("err reset scores");
    });
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          onFeatureSelected={(feature) => {
            setFeature(feature);
            setSeed(Math.random());
            setIsSettingsOpen(false);
          }}
          onSettingsClicked={() => {
            setIsSettingsOpen(true);
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
      {!isSettingsOpen && (
        <FeatureRenderer {...{ feature, seed, scores, updateScores }} />
      )}
      {isSettingsOpen && <Settings />}
    </AppShell>
  );
};

export default App;
