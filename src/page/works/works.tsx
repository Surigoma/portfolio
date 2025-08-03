import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Works() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("pages.works")}</h1>
      <Alert severity="info">{t("messages.creating_now")}</Alert>
    </>
  );
}
