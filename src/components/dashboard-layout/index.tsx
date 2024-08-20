import { Box, Stack } from "@mui/joy";
import Header from "../header";
import Sidebar from "../sidebar";

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IProps) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      <Sidebar />
      <Stack
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          gap: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          maxHeight: "100dvh",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
