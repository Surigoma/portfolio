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
import { useTranslation } from "react-i18next";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { MdMenu } from "react-icons/md";
import SkillListComponent from "./skill_list";
import {
  skills,
  skillText,
  type Language,
  type SkillLevel,
  type SkillTag,
} from "../data/portfolio";

const targetTags = skills
  .flatMap((skill) => skill.tags)
  .filter((value, index, values) => values.indexOf(value) === index);
const targetLevel = skills
  .map((s) => s.level.type)
  .filter((v, i, a) => a.indexOf(v) === i);

function TagSelector({
  tagFilter,
  setTagFilter,
  style,
}: {
  tagFilter: SkillTag[];
  setTagFilter: Dispatch<SetStateAction<SkillTag[]>>;
  style?: React.CSSProperties;
}) {
  const { i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  const text = skillText[language];
  return (
    <FormControl sx={{ m: 1, ...style }}>
      <InputLabel id="tags_title" size="small" htmlFor="tags">
        {text.tag}
      </InputLabel>
      <Select
        labelId="tags_title"
        multiple
        input={
          <OutlinedInput
            id="tags"
            aria-labelledby="tags_title"
            label={text.tag}
          />
        }
        size="small"
        value={tagFilter}
        onChange={(e) => {
          setTagFilter(e.target.value as SkillTag[]);
        }}
        renderValue={(tags) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(tags.length >= targetTags.length && (
              <Chip label={text.all} size="small" />
            )) ||
              tags.map((tag) => (
                <Chip
                  key={tag}
                  label={text.tags[tag]}
                  size="small"
                />
              ))}
          </Box>
        )}
      >
        {targetTags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {text.tags[tag]}
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
  skillFilter: SkillLevel[];
  setSkillFilter: Dispatch<SetStateAction<SkillLevel[]>>;
  style?: React.CSSProperties;
}) {
  const { i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  const text = skillText[language];
  return (
    <FormControl sx={{ m: 1, ...style }}>
      <InputLabel id="level_title" size="small" htmlFor="levels">
        {text.level}
      </InputLabel>
      <Select
        labelId="level_title"
        input={
          <OutlinedInput
            id="levels"
            aria-labelledby="level_title"
            label={text.level}
          />
        }
        multiple
        size="small"
        value={skillFilter}
        onChange={(e) => {
          setSkillFilter(e.target.value as SkillLevel[]);
        }}
        renderValue={(s) =>
          s.length >= targetLevel.length
            ? text.all
            : s.map((level) => text.levels[level]).join(",")
        }
      >
        {targetLevel.map((s) => (
          <MenuItem key={s} value={s}>
            <Checkbox checked={skillFilter.includes(s)} size="small" />
            <ListItemText primary={text.levels[s]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default function SkillComponent() {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [skillFilter, setSkillFilter] = useState<SkillLevel[]>([...targetLevel]);
  const [tagFilter, setTagFilter] = useState<SkillTag[]>([...targetTags]);
  const { t, i18n } = useTranslation();
  const language: Language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "ja";
  const minWidth = useMediaQuery((t) => t.breakpoints.up("sm"));
  useEffect(() => {
    if (minWidth) setDrawer(false);
  }, [minWidth]);
  return (
    <Card variant="outlined" className="skill_card">
      <CardHeader
        title={skillText[language].title}
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
          {skills
            .filter((s) => skillFilter.includes(s.level.type))
            .filter(
              (s) => s.tags.some((tag) => tagFilter.includes(tag))
            )
            .map((s) => (
              <SkillListComponent key={s.id} skill={s} selected={tagFilter} />
            ))}
        </List>
      </CardContent>
      <Drawer
        open={drawer}
        aria-hidden={!drawer}
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
