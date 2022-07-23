import * as Mantine from "@mantine/core"
import { Button, Title } from "@mantine/core"
import { Feature } from "../shared/types"

type NavbarProps = {
  onFeatureSelected: (feature: Feature) => void
}

const Navbar = ({ onFeatureSelected }: NavbarProps) => {
  return (
    <Mantine.Navbar width={{ base: 250 }} height={600} p="xs">
      <Mantine.Navbar.Section>
        <Title order={4}>Features</Title>
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
      </Mantine.Navbar.Section>
    </Mantine.Navbar>
  )
}

export default Navbar
