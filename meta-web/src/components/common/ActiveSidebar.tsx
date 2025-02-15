"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Online Indicator
const OnlineIndicator = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 2,
  right: 10,
  width: 12,
  height: 12,
  backgroundColor: theme.palette.success.main,
  borderRadius: "50%",
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

// Contacts Data
const contacts = [
  { name: "Jaden Chance", image: "/placeholder.svg?height=44&width=44" },
  { name: "Arezki Williams", image: "/placeholder.svg?height=44&width=44" },
  { name: "Rose James", image: "/placeholder.svg?height=44&width=44" },
  { name: "Tman Mats", image: "/placeholder.svg?height=44&width=44" },
  { name: "Alex Andrew", image: "/placeholder.svg?height=44&width=44" },
  { name: "Kaixi Cark", image: "/placeholder.svg?height=44&width=44" },
  { name: "Hamid Oskip", image: "/placeholder.svg?height=44&width=44" },
  { name: "Serena Lewis", image: "/placeholder.svg?height=44&width=44" },
  { name: "April Sky", image: "/placeholder.svg?height=44&width=44" },
];

export default function ActiveFriends() {
  const theme = useTheme(); // Get current theme

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: "1.25rem",
          }}
        >
          Active Friends
        </Typography>
      </Box>

      {/* Friends List */}
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 1,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
            borderRadius: 4,
          },
        }}
      >
        {contacts.map((contact, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ borderRadius: 2, m: 0.5 }}>
              <ListItemAvatar>
                <Box sx={{ position: "relative" }}>
                  <Avatar src={contact.image} alt={contact.name} sx={{ width: 44, height: 44 }} />
                  <OnlineIndicator />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 500, fontSize: "0.9375rem" }}>
                    {contact.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
