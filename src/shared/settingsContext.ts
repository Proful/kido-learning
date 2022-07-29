import { createContext, useContext } from "react"
import { Settings } from "./types"

export const initialSettingsState: Settings = {
  denominator: 5,
  operation: "add",
}

type SettingsContext = [
  Settings,
  React.Dispatch<React.SetStateAction<Settings>>
]

const settingsContext = createContext<SettingsContext>([
  initialSettingsState,
  () => {},
])

export const SettingsProvider = settingsContext.Provider

export const useSettings = (): SettingsContext => {
  const [settings, setSettings] = useContext(settingsContext)
  return [settings, setSettings]
}
