"use client"

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material"
import { MoreHoriz, Search } from "@mui/icons-material"

// Create Facebook-like dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: alpha("#ffffff", 0.7),
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "0 8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
})

const contacts = [
  {
    name: "Md Rana",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "شخوات حسين",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Tanvir Hasan",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Priyanka Dubey",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "জিনেদিন জিদান",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Asad Anik",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Meta Reveal",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Md Moniruzzaman",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Antu Saha",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Israt Jahan",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
  {
    name: "Shah Aman",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20at%2011.40.26%E2%80%AFPM-F6HsNWFo4YLGSOhoYTApBVCCErobOD.png",
  },
]

export default function Contacts() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "background.default",
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          position: "relative",
          right: 20,
        }}
      >
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Contacts
            </Typography>
          
             
          </Toolbar>
        </AppBar>

        <List
          sx={{
            width: "100%",
            bgcolor: "background.default",
            py: 1,
            flex: 1,
            overflow: "auto",
          }}
        >
          {contacts.map((contact, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                sx={{
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <ListItemAvatar
                  sx={{ minWidth: 52, display: "flex", justifyContent: "center" }}
                >
                  <Avatar
                    src={contact.image}
                    sx={{
                      width: 36,
                      height: 36,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: "text.primary",
                        textAlign: "center",
                      }}
                    >
                      {contact.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  )
}
