import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { FaReact, FaVuejs } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState, type Dispatch, type SetStateAction } from "react";
import { FaPython } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import SkillCardComponent, { type SkillBase } from "./skill_card";

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
const targetTags = skilmap
  .reduce((p, c) => [...p, ...(c.info.tags ?? [])], [""])
  .filter((v, i, a) => a.indexOf(v) === i && v !== "");
const targetLevel = skilmap
  .map((s) => s.level.type)
  .filter((v, i, a) => a.indexOf(v) === i);

function TagSelector({
  tagFilter,
  setTagFilter,
  style,
}: {
  tagFilter: string[];
  setTagFilter: Dispatch<SetStateAction<string[]>>;
  style?: React.CSSProperties;
}) {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ m: 1, ...style }}>
      <InputLabel id="tags_title" size="small" htmlFor="tags">
        {t("components.skills.tag")}
      </InputLabel>
      <Select
        labelId="tags_title"
        multiple
        input={
          <OutlinedInput
            id="tags"
            aria-labelledby="tags_title"
            label={t("components.skills.tag")}
          />
        }
        size="small"
        value={tagFilter}
        onChange={(e) => {
          setTagFilter([...e.target.value]);
        }}
        renderValue={(tags) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(tags.length >= targetTags.length && (
              <Chip label={t("components.skills.tags.all")} size="small" />
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
  );
}
function LevelSelector({
  skillFilter,
  setSkillFilter,
  style,
}: {
  skillFilter: string[];
  setSkillFilter: Dispatch<SetStateAction<string[]>>;
  style?: React.CSSProperties;
}) {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ m: 1, ...style }}>
      <InputLabel id="level_title" size="small" htmlFor="levels">
        {t("components.skills.level")}
      </InputLabel>
      <Select
        labelId="level_title"
        input={
          <OutlinedInput
            id="levels"
            aria-labelledby="level_title"
            label={t("components.skills.level")}
          />
        }
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
            <ListItemText primary={t("components.skills.levels." + s)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default function SkilComponent() {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [skillFilter, setSkillFilter] = useState<string[]>([...targetLevel]);
  const [tagFilter, setTagFilter] = useState<string[]>([...targetTags]);
  const { t } = useTranslation();
  const minWidth = useMediaQuery((t) => t.breakpoints.up("sm"));
  if (minWidth && drawer) {
    setDrawer(false);
  }
  return (
    <Card variant="outlined" className="skill_card">
      <CardHeader
        title={t("components.skills.title")}
        action={
          minWidth ? (
            <>
              <TagSelector
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
                style={{ width: 180 }}
              />
              <LevelSelector
                skillFilter={skillFilter}
                setSkillFilter={setSkillFilter}
                style={{ width: 180 }}
              />
            </>
          ) : (
            <IconButton onClick={() => setDrawer(true)}>
              <MdMenu />
            </IconButton>
          )
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
      <Drawer
        open={drawer}
        aria-hidden={!!!drawer}
        onClose={() => setDrawer(false)}
        anchor="bottom"
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <TagSelector tagFilter={tagFilter} setTagFilter={setTagFilter} />
          <LevelSelector
            skillFilter={skillFilter}
            setSkillFilter={setSkillFilter}
          />
        </Stack>
      </Drawer>
    </Card>
  );
}
