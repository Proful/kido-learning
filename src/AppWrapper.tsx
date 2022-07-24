import { useState } from "react"
import App from "./App"
import {
  initialSettingsState,
  SettingsProvider,
} from "./shared/settingsContext"

const AppWrapper = () => {
  const [settings, setSettings] = useState(initialSettingsState)

  return (
    <SettingsProvider value={[settings, setSettings]}>
      <App />
    </SettingsProvider>
  )
}

export default AppWrapper
