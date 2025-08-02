import { Box, Grid } from "@mui/material";
import "./profile.scss";
import SNSComponent from "../../component/sns";
import ProfileComponent from "../../component/profile";

export default function Profile() {
  return (
    <Box sx={{ minWidth: 500, margin: "10px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ProfileComponent />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SNSComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
