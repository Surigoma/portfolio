import fs from "fs";
import { execSync } from "child_process";
const git_cmd = "git log -n 1 --format=%H,%cd";

const now = new Date(Date.now()).toISOString();

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>https://surigoma.net/</loc>
        <priority>1.0</priority>
        <lastmod>${now}</lastmod>
    </url>
    <url>
        <loc>https://surigoma.net/works</loc>
        <lastmod>${now}</lastmod>
    </url>
</urlset>
`;
const git_info = execSync(git_cmd).toString().split(",");
const build_info = {
  hash: git_info[0],
  update: git_info[1],
};

fs.writeFile("public/file/sitemap.xml", sitemap, () => {});
fs.writeFile("public/file/build.json", JSON.stringify(build_info), () => {});
