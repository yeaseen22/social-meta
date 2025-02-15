import type React from "react"
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { Person, Settings, Chat, Videocam, Palette, NotificationsNone, Search } from "@mui/icons-material"
import SettingItem from "@/components/SettingItem"


const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar */}
      <SettingItem />

      {/* Main Content */}
      <Container sx={{ flex: 1, p: 3 }}>{children}</Container>
    </Box>
  )
}

export default SettingsLayout

