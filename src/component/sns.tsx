import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useColorScheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
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
      image: <FaXTwitter />,
      text: t("components.sns.x", { name: "surigomaxxxxxxx" }),
    },
    {
      href: "https://github.com/Surigoma",
      image: <FaGithub />,
      text: t("components.sns.github"),
    },
    {
      href: "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=拓矢-根岸-74234a333",
      image: <FaLinkedin />,
      text: t("components.sns.linkedin"),
    },
  ];

  return (
    <Card variant="outlined">
      <CardHeader title="SNS"></CardHeader>
      <CardContent>
        {SNS.map((s, i) => (
          <ListItemButton className="sns" href={s.href} target="_blank" key={i}>
            <ListItemAvatar>
              <Avatar sx={{ color: isDark ? "white" : "black" }}>
                {s.image}
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{s.text}</ListItemText>
          </ListItemButton>
        ))}
      </CardContent>
    </Card>
  );
}
