import * as Mantine from "@mantine/core"
import { ActionIcon, Button, Group, Title } from "@mantine/core"
import { Feature } from "../shared/types"
import { Settings } from "tabler-icons-react"
import { useSettings } from "../shared/settingsContext"

type NavbarProps = {
  onFeatureSelected: (feature: Feature) => void
  onSettingsClicked: () => void
}

const Navbar = ({ onFeatureSelected, onSettingsClicked }: NavbarProps) => {
  const [settings] = useSettings()
  return (
    <Mantine.Navbar width={{ base: 250, sm: 200, lg: 300 }} height={700} p="xs">
      <Mantine.Navbar.Section>
        <Group position="apart">
          <Title order={4}>Features</Title>
          <ActionIcon variant="transparent" onClick={onSettingsClicked}>
            <Settings size={16} />
          </ActionIcon>
        </Group>
      </Mantine.Navbar.Section>
      <Mantine.Navbar.Section grow mt="md">
        <div>
          <Button
            variant="subtle"
            onClick={() => onFeatureSelected(Feature.Clock)}
          >
            Clock
          </Button>
        </div>
        <div>
          <Button
            variant="subtle"
            onClick={() => onFeatureSelected(Feature.Multiplication)}
          >
            Multiplication
          </Button>
        </div>
        <div>
          <Button
            variant="subtle"
            onClick={() => onFeatureSelected(Feature.Division)}
          >
            Division
          </Button>
        </div>
        <div>
          <Button
            variant="subtle"
            onClick={() => onFeatureSelected(Feature.Addition)}
          >
            {settings.operation === "add" ? "Addition" : "Subtraction"}
          </Button>
        </div>
      </Mantine.Navbar.Section>
    </Mantine.Navbar>
  )
}

export default Navbar
