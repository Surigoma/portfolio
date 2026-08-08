import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Work from "../../component/work";
import { listedWorks, type Language } from "../../data/portfolio";

export default function Works() {
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>{t("pages.works")}</Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>{t("works.introduction")}</Typography>
      <Grid container spacing={2}>
        {listedWorks.map((work) => (
          <Grid
            key={work.id}
            size={{ xs: 12, md: "featured" in work && work.featured ? 12 : 6 }}
          >
            <Work
              id={work.id}
              title={work.title[language]}
              description={work.description![language]}
              tags={work.tags!}
              href={work.href!}
              featured={work.featured}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
