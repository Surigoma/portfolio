import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FaGithub } from "react-icons/fa";
import { MdArrowBack, MdArrowOutward } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Link as RouterLink, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { listedWorks, type Language } from "../../data/portfolio";

const articles = import.meta.glob<string>("../../content/works/*.md", { query: "?raw", import: "default", eager: true });

export default function WorkDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const work = listedWorks.find((item) => item.id === id);
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  const article = articles[`../../content/works/${id}.${language}.md`];

  if (!work || !article) {
    return <Box sx={{ my: 3 }}><Alert severity="error">{t("works.notFound")}</Alert><Button component={RouterLink} to="/works" startIcon={<MdArrowBack />} sx={{ mt: 2 }}>{t("works.back")}</Button></Box>;
  }

  return (
    <Box component="article" sx={{ my: 3, maxWidth: 820, mx: "auto" }}>
      <Button component={RouterLink} to="/works" startIcon={<MdArrowBack />} sx={{ mb: 2 }}>{t("works.back")}</Button>
      <Typography variant="h3" component="h1" gutterBottom>{work.title[language]}</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap" mb={3}>{work.tags!.map((tag) => <Chip key={tag} label={tag} size="small" />)}</Stack>
      <Box sx={{ "& h2": { mt: 4, mb: 1 }, "& p": { lineHeight: 1.8 }, "& li": { mb: 0.5 }, "& img": { maxWidth: "100%", borderRadius: 2 } }}><ReactMarkdown>{article}</ReactMarkdown></Box>
      {work.href && (
        <Button href={work.href} target="_blank" rel="noreferrer" variant="contained" startIcon={<FaGithub />} endIcon={<MdArrowOutward />} sx={{ mt: 3 }}>
          GitHub
        </Button>
      )}
    </Box>
  );
}
