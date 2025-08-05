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

export const SkillLevel = [
  "studies_only",
  "hobby",
  "hobby_with_work",
  "works_only",
] as const;
export type SkillLevelType = (typeof SkillLevel)[number];
export const TagList = [
  "frontend",
  "backend",
  "server",
  "library",
  "hardware",
  "cli_software",
] as const;
export type TagListType = (typeof TagList)[number];
export const DatePrefixList = ["years", "months"] as const;
export type DatePrefixListType = (typeof DatePrefixList)[number];

export interface SkillBase {
  name: string;
  icon: React.ReactElement;
  level: {
    type: SkillLevelType;
    maybe?: boolean;
    length: number;
    prefix: DatePrefixListType;
  };
  info: {
    tags: TagListType[];
    example?: {
      title: string;
      url?: string;
    }[];
  };
}
export default function SkillCardComponent({ skill }: { skill: SkillBase }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark =
    ((mode == undefined || mode == "system") && prefersDarkMode) ||
    mode == "dark";
  const [opened, setOpened] = useState<boolean>(false);
  const { t } = useTranslation();
  const skill_level_length =
    t("components.skills.level") +
    " : " +
    t("components.skills.levels." + skill.level.type) +
    " - " +
    (skill.level.maybe === true ? t("basic.dialog.maybe") : "") +
    " " +
    skill.level.length +
    " " +
    t("basic.date." + skill.level.prefix, { count: skill.level.length });
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
          primary={skill.name}
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
          {skill.name}
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
          <Typography variant="subtitle2">{skill_level_length}</Typography>
          <DialogContentText>
            <Trans
              t={t}
              i18nKey={"components.skills.messages." + skill.name}
              components={{ br: <br /> }}
            ></Trans>
          </DialogContentText>
          {skill.info.example !== undefined && (
            <>
              <Divider sx={{ my: 1 }}>
                {t("basic.dialog.example", {
                  count: skill.info.example.length,
                })}
              </Divider>
              <Grid container spacing={1}>
                {skill.info.example.map((v) => (
                  <Link href={v.url} key={v.title}>
                    {v.title}
                    <MdLink />
                  </Link>
                ))}
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
