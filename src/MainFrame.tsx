import "./App.scss";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "./i18n/config";
import { Outlet, useLocation, useNavigate } from "react-router";
import { routeBase } from "./routes";
import {
  MdContrast,
  MdDarkMode,
  MdLightMode,
  MdLanguage,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function MainFrame() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const locale = useLocation();
  let navigate = useNavigate();
  function langClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }
  function langClose() {
    setAnchorEl(null);
  }
  function changeTheme() {
    const themes = ["system", "dark", "light"];
    let priv = themes.indexOf(mode ?? "system");
    let next = (priv + 1) % themes.length;
    setMode(themes[next] as "system" | "light" | "dark");
  }
  return (
    <Container>
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ userSelect: "none" }}
          >
            {t("header.title")}
          </Typography>
          <Tooltip title={t("header.github")}>
            <IconButton
              id="github"
              target="_blank"
              href="https://github.com/Surigoma/portfolio"
            >
              <FaGithub />
            </IconButton>
          </Tooltip>
          <IconButton
            id="lang"
            aria-controls={open ? "lang-list" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={langClick}
          >
            <MdLanguage />
          </IconButton>
          <Menu
            id="lang-list"
            anchorEl={anchorEl}
            open={open}
            onClose={langClose}
            slotProps={{
              list: {
                "aria-labelledby": "lang",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                i18n.changeLanguage("ja");
              }}
              selected={i18n.language == "ja"}
            >
              {t("translation.jpn")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                i18n.changeLanguage("en");
              }}
              selected={i18n.language == "en"}
            >
              {t("translation.eng")}
            </MenuItem>
          </Menu>
          <IconButton
            onClick={() => {
              changeTheme();
            }}
          >
            {(mode == "system" || mode == null) && <MdContrast />}
            {mode == "dark" && <MdDarkMode />}
            {mode == "light" && <MdLightMode />}
          </IconButton>
        </Toolbar>
      </Container>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs aria-label="basic tabs example" value={locale.pathname}>
            {routeBase[0].children?.map((e) => {
              return (
                <Tab
                  label={t(e.title)}
                  value={e.path}
                  onClick={() => {
                    e.path && navigate(e.path);
                  }}
                  key={e.path}
                />
              );
            })}
          </Tabs>
        </Box>
      </Container>
      <Container className="contents">
        <Outlet />
      </Container>
    </Container>
  );
}
