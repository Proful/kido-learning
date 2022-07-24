import { MantineProvider } from "@mantine/core"
import React from "react"
import ReactDOM from "react-dom/client"
import AppWrapper from "./AppWrapper"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppWrapper />
    </MantineProvider>
  </React.StrictMode>
)
