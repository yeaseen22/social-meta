import type React from "react"
import { Box, Container } from "@mui/material"
import SettingItem from "@/components/SettingItem"
import { AppBarComponent } from "@/components/common"

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppBarComponent>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
        {/* Sidebar - Fixed Height */}
        <Box sx={{ width: 280, height: "100vh", position: "fixed", top: 0, left: 0, bgcolor: "background.paper", borderRight: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <SettingItem />
        </Box>

        {/* Main Content - Scrollable */}
        <Container sx={{ flex: 1, ml: "280px", p: 3, overflowY: "auto", height: "100vh" }}>
          {children}
        </Container>
      </Box>
    </AppBarComponent>
  )
}

export default SettingsLayout
