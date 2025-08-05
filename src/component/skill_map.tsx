import { FaLinux, FaReact, FaVuejs } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import type { SkillBase } from "./skill_list";

const skillmap: SkillBase[] = [
  {
    name: "React",
    icon: <FaReact />,
    level: {
      type: "hobby_with_work",
      maybe: true,
      beforeYear: 2022,
      prefix: "years",
    },
    meta: {
      tags: ["frontend"],
      example: [
        {
          title: "portfolio",
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
      beforeYear: 2024,
      prefix: "years",
    },
    meta: {
      tags: ["frontend"],
    },
  },
  {
    name: "Python",
    icon: <FaPython />,
    level: {
      type: "hobby_with_work",
      beforeYear: 2017,
      prefix: "years",
    },
    meta: {
      tags: ["frontend", "backend", "server", "cli_software"],
      example: [
        {
          title: "webhook-updater",
          url: "https://github.com/Surigoma/webhook-updater",
        },
      ],
    },
  },
  {
    name: "Linux",
    icon: <FaLinux />,
    level: {
      type: "hobby_with_work",
      beforeYear: 2015,
      prefix: "years",
    },
    meta: {
      tags: ["server", "cli_software"],
      example: [
        {
          title: "work_linux_enbedded",
        },
        {
          title: "hobby_linux",
        },
      ],
    },
  },
];

export default skillmap;
