import { AppBarComponent } from "@/components/common";
import Sidebar from "@/components/common/Sidebar";
import { Box } from "@mui/material";
import ActiveFriends from "@/components/common/ActiveSidebar";

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <AppBarComponent>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar on the left */}
        <Box sx={{ width: 200, p: 1, borderRight: "1px solid #ddd", flexShrink: 0 }}>
          <ActiveFriends />
        </Box>

        {/* Main content area (Scrollable) */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            height: "100vh",
          }}
        >
          {props.children}
        </Box>

        {/* Sidebar on the right */}
        <Box sx={{ width: 380, p: 2, borderLeft: "1px solid #ddd", flexShrink: 0 }}>
          <Sidebar />
        </Box>
      </Box>
    </AppBarComponent>
  );
};

export default HomeLayout;
