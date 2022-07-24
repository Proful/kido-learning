import { Button, TextInput, Title } from "@mantine/core"
import { saveSettings } from "../backend/core"
import { useSettings } from "../shared/settingsContext"

const Settings = () => {
  const [settings, setSettings] = useSettings()

  const onSave = () => {
    saveSettings(settings).then(console.log)
  }

  return (
    <div>
      <Title order={4}>Settings</Title>
      <TextInput
        value={settings.denominator}
        label="Denominator"
        onChange={(e) =>
          setSettings({ ...settings, denominator: +e.target.value })
        }
      />
      <br />
      <Button variant="outline" onClick={onSave}>
        Save
      </Button>
    </div>
  )
}

export default Settings
