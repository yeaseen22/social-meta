import { AppBarComponent } from "@/components/common";
import { Box } from "@mui/material";

const ProfileLayout = (props: { children: React.ReactNode }) => {
    return (
        <AppBarComponent>
            {/* Main content area (Scrollable) */}
            <Box
            >
                {props.children}
            </Box>

        </AppBarComponent>
    );
};

export default ProfileLayout;
