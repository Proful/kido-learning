import { AppShell, Navbar, Header, Title, Button } from "@mantine/core";
import { useState } from "react";
import Division from "./components/Division";
import MagicClock from "./components/MaagicClock";
import Multiplication from "./components/Multiplication";

function App() {
  const [showClock, setShowClock] = useState(0);
  const [showMultiplication, setShowMultiplication] = useState(0);
  const [showDivision, setShowDivision] = useState(0);

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
                  setShowDivision(0);
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
                  setShowDivision(0);
                }}
              >
                Multiplication
              </Button>
            </div>
            <div>
              <Button
                variant="subtle"
                onClick={() => {
                  setShowDivision(Math.random());
                  setShowClock(0);
                  setShowMultiplication(0);
                }}
              >
                Division
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
          backgroundColor: theme.colors.dark[6],
          color: theme.colors.gray[2],
        },
      })}
    >
      {!!showClock && <MagicClock render={showClock} />}
      {!!showMultiplication && <Multiplication render={showMultiplication} />}
      {!!showDivision && <Division render={showDivision} />}
    </AppShell>
  );
}

export default App;
