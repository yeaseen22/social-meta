import { AppBarComponent } from '@/components/common';
import Sidebar from '@/components/common/Sidebar';
import { Box } from '@mui/material';
import Contacts from '@/components/common/contactSideBar';

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <AppBarComponent>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar on the left */}
        <Box sx={{ width: 200, p: 1, borderRight: '1px solid #ddd' }}>
          <Contacts />
        </Box>

        {/* Main content area */}
        <Box sx={{ flex: 1, p: 2 }}>
          {props.children}
        </Box>

        {/* Sidebar on the right */}
        <Box sx={{ width: 380, p: 2, borderLeft: '1px solid #ddd' }}>
          <Sidebar />
        </Box>
      </Box>
    </AppBarComponent>
  );
};

export default HomeLayout;
