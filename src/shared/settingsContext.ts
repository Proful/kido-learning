import { createContext, useContext } from "react"

interface SettingsState {
  denominator: number
}

export const initialSettingsState: SettingsState = {
  denominator: 5,
}

type SettingsContext = [
  SettingsState,
  React.Dispatch<React.SetStateAction<SettingsState>>
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
