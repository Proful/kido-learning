import { Button, Select, TextInput, Title } from "@mantine/core";
import { saveSettings } from "../backend/core";
import { useSettings } from "../shared/settingsContext";

const Settings = () => {
  const [settings, setSettings] = useSettings();

  const onSave = () => {
    saveSettings(settings).then(console.log);
  };

  return (
    <div style={{ width: "32%" }}>
      <Title order={4}>Settings</Title>
      <TextInput
        value={settings.denominator}
        label="Denominator"
        onChange={(e) =>
          setSettings({ ...settings, denominator: +e.target.value })}
      />
      <br />
      <Select
        label="Addition or Subtraction"
        placeholder="Pick one"
        data={[
          { value: "add", label: "Addition" },
          { value: "subtract", label: "Subtraction" },
        ]}
        value={settings.operation}
        onChange={(value) =>
          setSettings({ ...settings, operation: value ?? "add" })}
        mb="xl"
      />
      <Button variant="outline" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default Settings;
