import { Button, Title } from "@mantine/core"
import { useSettings } from "../shared/settingsContext"

const Settings = () => {
  const [settings, setSettings] = useSettings()

  return (
    <div>
      <Title order={4}>Settings</Title>
      <p>Denominator: {settings.denominator}</p>
      <Button
        onClick={() =>
          setSettings({ ...settings, denominator: settings.denominator + 1 })
        }
      >
        Save
      </Button>
    </div>
  )
}

export default Settings
