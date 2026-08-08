import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArticle, MdClose, MdOpenInNew } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { skillText, works, type Language, type SkillData } from "../data/portfolio";
import { skillIcons } from "../data/skill-icons";
import { Link as RouterLink } from "react-router";

const currentYear = new Date().getFullYear();

export default function SkillListComponent({
  skill,
  selected,
}: {
  skill: SkillData;
  selected: string[];
}) {
  const [opened, setOpened] = useState<boolean>(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark =
    ((mode == undefined || mode == "system") && prefersDarkMode) ||
    mode == "dark";
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  const text = skillText[language];
  const examples = works.filter((work) => work.skills.includes(skill.id));
  const beforeYear = skill.level.beforeYear
    ? currentYear - skill.level.beforeYear
    : skill.level.length;
  const skill_level_length = `${text.level} : ${text.levels[skill.level.type]}${
    beforeYear && skill.level.prefix
      ? ` - ${skill.level.maybe ? t("basic.dialog.maybe") : ""} ${beforeYear} ${t(`basic.date.${skill.level.prefix}`, { count: beforeYear })}`
      : ""
  }`;
  return (
    <>
      <ListItemButton
        key={skill.id}
        sx={{ py: 0 }}
        onClick={() => setOpened(true)}
      >
        <ListItemAvatar>
          <Avatar sx={{ color: isDark ? "white" : "black" }}>
            {skillIcons[skill.id]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={skill.title[language]}
          secondary={skill_level_length}
        ></ListItemText>
      </ListItemButton>
      <Dialog
        open={opened}
        aria-hidden={!opened}
        onClose={() => setOpened(false)}
        aria-labelledby={"skill_" + skill.id + "_title"}
      >
        <DialogTitle id={"skill_" + skill.id + "_title"}>
          <Stack spacing={1}>
            {skill.title[language]}
            <Grid container direction="row" spacing={1}>
              <Typography>{text.tag + " :"}</Typography>
              {skill.tags.map((v) => (
                <Chip
                  key={v}
                  color={selected.includes(v) ? "primary" : "default"}
                  variant="outlined"
                  label={text.tags[v]}
                  size="small"
                />
              ))}
            </Grid>
          </Stack>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpened(false);
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <MdClose />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            minWidth: 300,
            maxWidth: "100%",
          }}
        >
          <Typography variant="subtitle2" sx={{ pb: 1 }}>
            {skill_level_length}
          </Typography>
          <DialogContentText component="div">
            {skill.description[language].map((paragraph) => (
              <Typography component="p" sx={{ mb: 2 }} key={paragraph}>{paragraph}</Typography>
            ))}
          </DialogContentText>
          {examples.length > 0 && (
            <>
              <Divider sx={{ my: 1 }}>
                {t("basic.dialog.works_example", {
                  count: examples.length,
                })}
              </Divider>
              <ul>
                {examples.map((work) => (
                  <li key={work.id}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                      <Typography component="span">{work.title[language]}</Typography>
                      {work.description && (
                        <Link
                          component={RouterLink}
                          to={`/works/${work.id}`}
                          onClick={() => setOpened(false)}
                          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                        >
                          <MdArticle />
                          {t("works.article")}
                        </Link>
                      )}
                      {work.href && (
                        <Link
                          href={work.href}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                        >
                          <FaGithub />
                          GitHub
                          <MdOpenInNew />
                        </Link>
                      )}
                    </Stack>
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
