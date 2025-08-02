import {
  useMediaQuery,
  useColorScheme,
  Card,
  CardHeader,
  CardContent,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SNSComponent() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark =
    ((mode == undefined || mode == "system") && prefersDarkMode) ||
    mode == "dark";
  const { t } = useTranslation();
  return (
    <Card variant="outlined">
      <CardHeader title="SNS"></CardHeader>
      <CardContent>
        <ListItemButton
          className="sns"
          href="https://x.com/surigomaxxxxxxx"
          target="_blank"
        >
          <ListItemAvatar>
            <Avatar>
              <img
                src="./img/sns/x.svg"
                alt=""
                style={{
                  filter: isDark
                    ? ""
                    : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
                }}
              ></img>
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Follow @surigomaxxxxxxx</ListItemText>
        </ListItemButton>
        <ListItemButton
          className="sns"
          href="https://github.com/Surigoma"
          target="_blank"
        >
          <ListItemAvatar>
            <Avatar>
              <img
                src={
                  isDark
                    ? "./img/sns/github-mark-white.svg"
                    : "./img/sns/github-mark.svg"
                }
              ></img>
            </Avatar>
          </ListItemAvatar>
          <ListItemText>GitHub</ListItemText>
        </ListItemButton>
        <ListItemButton
          className="sns"
          href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=拓矢-根岸-74234a333"
          target="_blank"
        >
          <ListItemAvatar>
            <Avatar>
              <img
                src={
                  isDark
                    ? "./img/sns/InBug-White.png"
                    : "./img/sns/InBug-Black.png"
                }
              ></img>
            </Avatar>
          </ListItemAvatar>
          <ListItemText>{t("profile.sns.linkedin")}</ListItemText>
        </ListItemButton>
      </CardContent>
    </Card>
  );
}
