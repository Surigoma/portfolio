import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import BoringAvatar from "boring-avatars";
import { useTranslation } from "react-i18next";

export default function ProfileComponent() {
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <CardHeader
        title={t("components.profile.title")}
        avatar={
          <BoringAvatar
            name="surigoma"
            variant="beam"
            colors={["#5b1d99", "#0074b4", "#00b34c", "#ffd41f", "#fc6e3d"]}
            size={40}
          />
        }
      ></CardHeader>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {t("components.profile.name.title")}
        </Typography>
        <Typography variant="h5" component="div">
          {t("components.profile.name.value")}
        </Typography>
      </CardContent>
    </Card>
  );
}
