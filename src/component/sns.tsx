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
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SNSInfo {
  href: string;
  image: ReactNode;
  text: string;
}

export default function SNSComponent() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode } = useColorScheme();
  const isDark =
    ((mode == undefined || mode == "system") && prefersDarkMode) ||
    mode == "dark";
  const { t } = useTranslation();
  const SNS: SNSInfo[] = [
    {
      href: "https://x.com/surigomaxxxxxxx",
      image: (
        <img
          src="./img/sns/x.svg"
          alt=""
          style={{
            filter: isDark
              ? ""
              : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
          }}
        ></img>
      ),
      text: t("profile.sns.x", { name: "surigomaxxxxxxx" }),
    },
    {
      href: "https://github.com/Surigoma",
      image: (
        <img
          src={
            isDark
              ? "./img/sns/github-mark-white.svg"
              : "./img/sns/github-mark.svg"
          }
        ></img>
      ),
      text: t("profile.sns.github"),
    },
    {
      href: "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=拓矢-根岸-74234a333",
      image: (
        <img
          src={
            isDark ? "./img/sns/InBug-White.png" : "./img/sns/InBug-Black.png"
          }
        ></img>
      ),
      text: t("profile.sns.linkedin"),
    },
  ];

  return (
    <Card variant="outlined">
      <CardHeader title="SNS"></CardHeader>
      <CardContent>
        {SNS.map((s, i) => (
          <ListItemButton className="sns" href={s.href} target="_blank" key={i}>
            <ListItemAvatar>
              <Avatar>{s.image}</Avatar>
            </ListItemAvatar>
            <ListItemText>{s.text}</ListItemText>
          </ListItemButton>
        ))}
      </CardContent>
    </Card>
  );
}
