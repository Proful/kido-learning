import { AppShell, Navbar, Header, Title, Button } from "@mantine/core";
import { useState } from "react";
import MagicClock from "./components/MaagicClock";
import Multiplication from "./components/Multiplication";

function App() {
  const [showClock, setShowClock] = useState(0);
  const [showMultiplication, setShowMultiplication] = useState(0);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height={500} p="xs">
          <Navbar.Section>
            <Title order={4}>Features</Title>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <div>
              <Button
                variant="subtle"
                onClick={() => {
                  setShowClock(Math.random());
                  setShowMultiplication(0);
                }}
              >
                Clock
              </Button>
            </div>
            <div>
              <Button
                variant="subtle"
                onClick={() => {
                  setShowMultiplication(Math.random());
                  setShowClock(0);
                }}
              >
                Multiplication
              </Button>
            </div>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Title order={6}>Kido Learning</Title>
        </Header>
      }
      styles={(theme) => ({
        root: {
          backgroundColor: theme.colors.gray[2],
          color: theme.colors.dark[6],
        },
      })}
    >
      {!!showClock && <MagicClock render={showClock} />}
      {!!showMultiplication && <Multiplication render={showMultiplication} />}
    </AppShell>
  );
}

export default App;
