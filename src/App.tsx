import { AppShell, Header, Title } from "@mantine/core"
import { useState } from "react"
import FeatureRenderer from "./components/features/FeatureRenderer"
import Navbar from "./components/Navbar"
import useScores from "./hooks/useScores"
import { Feature } from "./types"

const App = () => {
  const [feature, setFeature] = useState<Feature>(Feature.Clock)
  const [seed, setSeed] = useState<number>(0)
  const { scores, updateScores } = useScores()

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
