import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { FaReact, FaVuejs } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SkillCardComponent, { type SkillBase } from "./skill_card";
import { FaPython } from "react-icons/fa6";

const skilmap: SkillBase[] = [
  {
    name: "React",
    icon: <FaReact />,
    level: {
      type: "hobby_with_work",
      maybe: true,
      length: 2,
      prefix: "years",
    },
    info: {
      tags: ["frontend"],
      example: [
        {
          title: "Portfolio",
          url: "https://github.com/Surigoma/portfolio",
        },
      ],
    },
  },
  {
    name: "Vue",
    icon: <FaVuejs />,
    level: {
      type: "studies_only",
      maybe: true,
      length: 2,
      prefix: "years",
    },
    info: {
      tags: ["frontend"],
    },
  },
  {
    name: "Python",
    icon: <FaPython />,
    level: {
      type: "hobby_with_work",
      maybe: true,
      length: 5,
      prefix: "years",
    },
    info: {
      tags: ["frontend", "backend", "server", "cli_software"],
    },
  },
];
export default function SkilComponent() {
  const targetLevel = skilmap
    .map((s) => s.level.type)
    .filter((v, i, a) => a.indexOf(v) === i);
  const targetTags = skilmap
    .reduce((p, c) => [...p, ...(c.info.tags ?? [])], [""])
    .filter((v, i, a) => a.indexOf(v) === i && v !== "");
  const [skillFilter, setSkillFilter] = useState<string[]>([...targetLevel]);
  const [tagFilter, setTagFilter] = useState<string[]>([...targetTags]);
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <CardHeader
        title={t("components.skills.title")}
        action={
          <>
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="tags_title" size="small">
                {t("components.skills.tag")}
              </InputLabel>
              <Select
                labelId="tags_title"
                id="tags"
                multiple
                input={<OutlinedInput label={t("components.skills.tag")} />}
                size="small"
                value={tagFilter}
                onChange={(e) => {
                  setTagFilter([...e.target.value]);
                }}
                renderValue={(tags) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(tags.length >= targetTags.length && (
                      <Chip
                        label={t("components.skills.tags.all")}
                        size="small"
                      />
                    )) ||
                      tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={t("components.skills.tags." + tag)}
                          size="small"
                        />
                      ))}
                  </Box>
                )}
              >
                {targetTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {t("components.skills.tags." + tag)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="level_title" size="small">
                {t("components.skills.level")}
              </InputLabel>
              <Select
                labelId="level_title"
                id="levels"
                input={<OutlinedInput label={t("components.skills.level")} />}
                multiple
                size="small"
                value={skillFilter}
                onChange={(e) => {
                  setSkillFilter([...e.target.value]);
                }}
                renderValue={(s) =>
                  s.length >= targetLevel.length
                    ? t("components.skills.levels.all")
                    : s.map((s) => t("components.skills.levels." + s)).join(",")
                }
              >
                {targetLevel.map((s) => (
                  <MenuItem key={s} value={s}>
                    <Checkbox checked={skillFilter.includes(s)} size="small" />
                    <ListItemText
                      primary={t("components.skills.levels." + s)}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <Alert severity="info">{t("messages.adding_now")}</Alert>
        <List>
          {skilmap
            .filter((s) => skillFilter.includes(s.level.type))
            .filter(
              (s) => s.info.tags.filter((t) => tagFilter.includes(t)).length > 0
            )
            .map((s) => (
              <SkillCardComponent key={s.name} skill={s} />
            ))}
        </List>
      </CardContent>
    </Card>
  );
}
