import { AppBarComponent } from "@/components/common";
import Sidebar from "@/components/common/Sidebar";
import { Box } from "@mui/material";
import ActiveFriends from "@/components/common/ActiveSidebar";

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <AppBarComponent>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 64px)",
          overflow: "hidden"
        }}
      >
        {/* Sidebar on the left (Non-Scrollable) */}
        <Box
          sx={{
            width: 200,
            p: 1,
            borderRight: "1px solid #ddd",
            flexShrink: 0,
            height: "100vh", // Ensures full height
            position: 'relative',
            left: '45px'
          }}
        >
          <ActiveFriends />
        </Box>

        {/* Main content area (Scrollable) */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          {props.children}
        </Box>

        {/* Sidebar on the right (Non-Scrollable) */}
        <Box
          sx={{
            width: 380,
            p: 2,
            borderLeft: "1px solid #ddd",
            flexShrink: 0,
            height: "100vh", // Ensures full height
            overflow: "hidden", // Prevents scrolling in sidebar
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </AppBarComponent>
  );
};

export default HomeLayout;
