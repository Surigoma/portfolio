import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";
import { FaGithub } from "react-icons/fa";
import { MdArrowForward, MdArrowOutward, MdCode } from "react-icons/md";
import { useTranslation } from "react-i18next";

export type WorkProps = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  href?: string;
  featured?: boolean;
};

export default function Work({ id, title, description, tags, href, featured = false }: WorkProps) {
  const { t } = useTranslation();
  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", height: "100%", borderColor: featured ? "primary.main" : "divider" }}>
      <CardActionArea component={RouterLink} to={`/works/${id}`} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 2, color: "primary.main", bgcolor: "action.hover", fontSize: 26 }}><MdCode /></Box>
            <Box>
              {featured && <Typography variant="overline" color="primary.main">{t("works.featured")}</Typography>}
              <Typography variant="h5" component="h2">{title}</Typography>
            </Box>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>
          <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
            {tags.map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button component={RouterLink} to={`/works/${id}`} endIcon={<MdArrowForward />}>{t("works.details")}</Button>
        {href && <Button href={href} target="_blank" rel="noreferrer" startIcon={<FaGithub />} endIcon={<MdArrowOutward />}>GitHub</Button>}
      </CardActions>
    </Card>
  );
}
