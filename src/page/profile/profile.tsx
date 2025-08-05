import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "./profile.scss";
import SNSComponent from "../../component/sns";
import ProfileComponent from "../../component/profile";
import SkillComponent from "../../component/skill";

export default function Profile() {
  return (
    <Box sx={{ margin: "10px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <ProfileComponent />
            <SkillComponent />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SNSComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
