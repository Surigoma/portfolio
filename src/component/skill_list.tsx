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
import { Trans, useTranslation } from "react-i18next";
import { MdClose, MdLink } from "react-icons/md";
import i18n from "../i18n/config";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SkillBase } from "./skill_map";

export default function SkillListComponent({
  skill,
  selected,
}: {
  skill: SkillBase;
  selected: string[];
}) {
  const [opened, setOpened] = useState<boolean>(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark =
    ((mode == undefined || mode == "system") && prefersDarkMode) ||
    mode == "dark";
  const { t } = useTranslation();
  const beforeYear = skill.level.beforeYear
    ? new Date(Date.now()).getFullYear() - skill.level.beforeYear!
    : skill.level.length;
  const skill_level_length =
    t("components.skills.level") +
    " : " +
    t("components.skills.levels." + skill.level.type) +
    " - " +
    (skill.level.maybe === true ? t("basic.dialog.maybe") : "") +
    " " +
    beforeYear +
    " " +
    t("basic.date." + skill.level.prefix, { count: beforeYear });
  return (
    <>
      <ListItemButton
        key={skill.name}
        sx={{ py: 0 }}
        onClick={() => setOpened(true)}
      >
        <ListItemAvatar>
          <Avatar sx={{ color: isDark ? "white" : "black" }}>
            {skill.icon}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={t("components.skills.skill_title." + skill.name)}
          secondary={skill_level_length}
        ></ListItemText>
      </ListItemButton>
      <Dialog
        open={opened}
        aria-hidden={!opened}
        onClose={() => setOpened(false)}
        aria-labelledby={"skill_" + skill.name + "_title"}
      >
        <DialogTitle id={"skill_" + skill.name + "_title"}>
          <Stack spacing={1}>
            {t("components.skills.skill_title." + skill.name)}
            <Grid container flexDirection="row" spacing={1}>
              <Typography>{t("components.skills.tag") + " :"}</Typography>
              {skill.meta.tags.map((v) => (
                <Chip
                  key={v}
                  color={selected.includes(v) ? "primary" : "default"}
                  variant="outlined"
                  label={t("components.skills.tags." + v)}
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
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={"components.skills.messages." + skill.name}
              components={{ br: <br /> }}
            ></Trans>
          </DialogContentText>
          {i18n.language != "ja" && !skill.meta.notUseTrans && (
            <Grid justifyContent="flex-end" container>
              <Typography align="right" width="100%" variant="caption">
                Using Google Translate
              </Typography>
            </Grid>
          )}
          {skill.meta.example !== undefined && (
            <>
              <Divider sx={{ my: 1 }}>
                {t("basic.dialog.works_example", {
                  count: skill.meta.example.length,
                })}
              </Divider>
              <ul>
                {skill.meta.example.map((v) => (
                  <li key={v.title}>
                    {(v.url !== undefined && (
                      <Link href={v.url}>
                        {t("works." + v.title + ".title")}
                        <MdLink />
                      </Link>
                    )) || (
                      <Typography>
                        {t("works." + v.title + ".title")}
                      </Typography>
                    )}
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
