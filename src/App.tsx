import { AppShell, Navbar, Header, Title, Button } from "@mantine/core";
import { useState } from "react";
import MagicClock from "./components/MaagicClock";

function App() {
  const [showClock, setShowClock] = useState(0);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height={500} p="xs">
          <Navbar.Section>
            <Title order={4}>Features</Title>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <Button onClick={() => setShowClock(Math.random())}>Clock</Button>
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
    </AppShell>
  );
}

export default App;
