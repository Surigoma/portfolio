import { FaLinux, FaReact, FaVuejs } from "react-icons/fa";
import { FaGolang, FaPython } from "react-icons/fa6";
import { SiC, SiCplusplus } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { PiCircuitry } from "react-icons/pi";

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
  "gui_software",
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
      length: 2,
      prefix: "months",
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
        {
          title: "raspi-dmxbox",
          url: "https://github.com/Surigoma/raspi-DMXBox",
        },
        {
          title: "ledDisplay",
          url: "https://github.com/Surigoma/ledDisplay",
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
  {
    name: "C",
    icon: <SiC />,
    level: {
      type: "works_only",
      beforeYear: 2015,
      prefix: "years",
    },
    meta: {
      tags: ["backend", "cli_software", "language"],
      example: [
        {
          title: "work_linux_enbedded",
        },
      ],
    },
  },
  {
    name: "C++",
    icon: <SiCplusplus />,
    level: {
      type: "hobby_with_work",
      beforeYear: 2015,
      prefix: "years",
    },
    meta: {
      tags: ["cli_software", "language", "hardware"],
      example: [
        {
          title: "work_linux_enbedded",
        },
        {
          title: "IRIG2JJY-M5",
          url: "https://github.com/Surigoma/IRIG2JJY-M5",
        },
      ],
    },
  },
  {
    name: "C#",
    icon: <TbBrandCSharp />,
    level: {
      type: "hobby",
      beforeYear: 2016,
      prefix: "years",
    },
    meta: {
      tags: ["gui_software", "library", "language"],
      example: [
        {
          title: "electronic_bulletin_borad",
          url: "https://github.com/Surigoma/Electronicboard",
        },
        {
          title: "twitry",
          url: "https://github.com/Surigoma/Twitry",
        },
      ],
    },
  },
  {
    name: "circuit_development",
    icon: <PiCircuitry />,
    level: {
      type: "hobby",
      beforeYear: 2010,
      prefix: "years",
    },
    meta: {
      tags: ["hardware"],
      example: [
        {
          title: "electronic_bulletin_borad",
          url: "https://github.com/Surigoma/Electronicboard",
        },
        {
          title: "IRIG2JJY-M5",
          url: "https://github.com/Surigoma/IRIG2JJY-M5",
        },
      ],
    },
  },
  {
    name: "Go",
    icon: <FaGolang />,
    level: {
      type: "hobby",
      beforeYear: 2024,
      prefix: "years",
    },
    meta: {
      tags: ["backend", "language", "cli_software"],
      example: [
        {
          title: "DMXBOX",
          url: "https://github.com/Surigoma/DMXBOX",
        },
      ],
    },
  },
];

export default skillmap;
