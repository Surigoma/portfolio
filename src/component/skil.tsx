import { Alert, Card, CardContent, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SkilComponent() {
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <CardHeader title={t("profile.skils.title")}></CardHeader>
      <CardContent>
        <Alert severity="info">{t("messages.creating_now")}</Alert>
      </CardContent>
    </Card>
  );
}
