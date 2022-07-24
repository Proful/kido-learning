import { useState } from "react"
import App from "./App"
import {
  initialSettingsState,
  SettingsProvider,
} from "./shared/settingsContext"

const AppWrapper = () => {
  const settingsContext = useState(initialSettingsState)

  return (
    <SettingsProvider value={settingsContext}>
      <App />
    </SettingsProvider>
  )
}

export default AppWrapper
