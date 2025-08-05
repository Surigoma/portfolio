import { FaLinux, FaReact, FaVuejs } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { SiC, SiCplusplus } from "react-icons/si";

export const SkillLevel = [
  "studies_only",
  "hobby",
  "hobby_with_work",
  "works_only",
] as const;
export type SkillLevelType = (typeof SkillLevel)[number];
export const TagList = [
  "frontend",
  "backend",
  "server",
  "library",
  "hardware",
  "cli_software",
  "language",
] as const;
export type TagListType = (typeof TagList)[number];
export const DatePrefixList = ["years", "months"] as const;
export type DatePrefixListType = (typeof DatePrefixList)[number];

export interface SkillBase {
  name: string;
  icon: React.ReactElement;
  level: {
    type: SkillLevelType;
    maybe?: boolean;
    length?: number;
    beforeYear?: number;
    prefix: DatePrefixListType;
  };
  meta: {
    notUseTrans?: boolean;
    tags: TagListType[];
    example?: {
      title: string;
      url?: string;
    }[];
  };
}

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
