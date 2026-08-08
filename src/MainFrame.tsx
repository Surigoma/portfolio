import "./App.scss";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { routeBase } from "./routes";
import {
  MdContrast,
  MdDarkMode,
  MdLightMode,
  MdLanguage,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useColorScheme } from "@mui/material/styles";

export default function MainFrame() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  function langClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }
  function langClose() {
    setAnchorEl(null);
  }
  function changeTheme() {
    const themes = ["system", "dark", "light"];
    const current = themes.indexOf(mode ?? "system");
    const next = (current + 1) % themes.length;
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
            aria-label="Change language"
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
                void i18n.changeLanguage("ja");
                langClose();
              }}
              selected={i18n.resolvedLanguage == "ja"}
            >
              {t("translation.jpn")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                void i18n.changeLanguage("en");
                langClose();
              }}
              selected={i18n.resolvedLanguage?.startsWith("en")}
            >
              {t("translation.eng")}
            </MenuItem>
          </Menu>
          <IconButton
            aria-label="Change color scheme"
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
          <Tabs aria-label="basic tabs example" value={location.pathname}>
            {routeBase[0].children?.map((e) => {
              return (
                <Tab
                  label={t(e.title)}
                  value={e.path}
                  onClick={() => {
                    if (e.path) navigate(e.path);
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
