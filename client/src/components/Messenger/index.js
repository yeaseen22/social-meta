import React, { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  TextField,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronLeft,
  Clock,
  FileText,
  Image,
  MessageSquare,
  Search,
  Users,
  Video,
} from "lucide-react";
import MainChatArea from './MainChatArea';


export default function Messenger() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 1200,
        height: isSmallScreen ? "auto" : 700,
        display: "grid",
        gridTemplateColumns: isSmallScreen
          ? "1fr"
          : sidebarOpen
            ? "280px 1fr 64px"
            : "1fr 64px",
        backgroundColor: "#F8FAFC",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* Left Sidebar */}
      {(!isSmallScreen || sidebarOpen) && (
        <Box
          sx={{
            borderRight: 1,
            borderColor: "divider",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Sidebar Header */}
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Typography variant="subtitle1" fontWeight="bold">
              Chat
            </Typography>
          </Box>

          {/* Profile Section */}
          <Box textAlign="center">
            <Avatar sx={{ width: 64, height: 64, mx: "auto" }}>JA</Avatar>
            <Typography variant="h6">Jontray Arnold</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#4FD1C5",
                backgroundColor: "#E6FFFA",
                borderRadius: 2,
                px: 1,
              }}
            >
              Available
            </Typography>
          </Box>

          {/* Search */}
          <Box sx={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                top: 12,
                left: 8,
                color: "gray",
              }}
            />
            <TextField
              placeholder="Search"
              fullWidth
              size="small"
              sx={{ pl: 4 }}
            />
          </Box>

          {/* Chat List Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="body2" color="textSecondary">
              Last chats
            </Typography>
            <Button variant="outlined" size="small">
              +
            </Button>
          </Box>

          {/* Chat List */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            {["Kate Johnson", "Tamara Shevchenko", "Joshua Clarkson"].map(
              (name, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  p={1}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.05)",
                      borderRadius: 2,
                    },
                  }}
                >
                  <Avatar>{name[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last message preview...
                    </Typography>
                  </Box>
                </Box>
              )
            )}
          </Box>
        </Box>
      )}

      {/* Main Chat Area */}
      <MainChatArea />

      {/* Right Sidebar */}
      <Box
        sx={{
          borderLeft: 1,
          borderColor: "divider",
          p: 2,
          display: isSmallScreen ? "none" : "block",
        }}
      >
        <AvatarGroup max={3}>
          <Avatar>
            <MessageSquare size={16} />
          </Avatar>
          <Avatar>
            <Users size={16} />
          </Avatar>
          <Avatar>
            <FileText size={16} />
          </Avatar>
          <Avatar>
            <Image size={16} />
          </Avatar>
          <Avatar>
            <Video size={16} />
          </Avatar>
          <Avatar>
            <Clock size={16} />
          </Avatar>
        </AvatarGroup>
      </Box>
    </Card>
  );
}
