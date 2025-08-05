import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DateTime } from "luxon";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config";
import Link from "@mui/material/Link";

interface BuildMeta {
  update?: DateTime;
  hash?: string;
}

export default function UpdatedComponent() {
  const [meta, setMeta] = useState<BuildMeta>({});
  useEffect(() => {
    fetch("meta/build.json")
      .then((r) => r.json())
      .then((d) => {
        setMeta({
          update: DateTime.fromJSDate(new Date(d.update)),
          hash: d.hash,
        });
      });
  }, []);
  const { t } = useTranslation();
  function tt(s: string) {
    return t("components.updated." + s);
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          gutterBottom
          sx={{ color: "text.secondary" }}
          variant="subtitle1"
        >
          {tt("updated_for")}
        </Typography>
        <Typography variant="body2" component="div" sx={{ pb: 1 }}>
          {meta.update !== undefined
            ? meta.update.toLocaleString(
                {
                  dateStyle: "full",
                  timeStyle: "long",
                },
                {
                  locale: i18n.language,
                }
              )
            : "Loading..."}
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "text.secondary" }}
          variant="subtitle1"
        >
          {tt("hash")}
        </Typography>
        <Typography variant="body2" component="div">
          {meta.hash ? (
            <Link
              href={"https://github.com/Surigoma/portfolio/commit/" + meta.hash}
            >
              commit/{meta.hash.substring(0, 7)}
            </Link>
          ) : (
            "Loading..."
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
