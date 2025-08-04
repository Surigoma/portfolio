import { Box, Grid, Stack } from "@mui/material";
import "./profile.scss";
import SNSComponent from "../../component/sns";
import ProfileComponent from "../../component/profile";
import SkilComponent from "../../component/skil";

export default function Profile() {
  return (
    <Box sx={{ margin: "10px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <ProfileComponent />
            <SkilComponent />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SNSComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
