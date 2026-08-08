import type { ReactElement } from "react";
import { FaAws, FaLinux, FaReact, FaVuejs } from "react-icons/fa";
import { FaGolang, FaPython } from "react-icons/fa6";
import { SiBlender, SiC, SiCplusplus, SiKubernetes, SiTypescript, SiUnrealengine } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { PiCircuitry } from "react-icons/pi";
import { MdAutoAwesome, MdDeveloperBoard, MdSync } from "react-icons/md";
import type { SkillId } from "./portfolio";

export const skillIcons: Record<SkillId, ReactElement> = {
  React: <FaReact />, Vue: <FaVuejs />, Python: <FaPython />, Linux: <FaLinux />,
  C: <SiC />, "C++": <SiCplusplus />, "C#": <TbBrandCSharp />,
  circuit_development: <PiCircuitry />, Go: <FaGolang />,
  TypeScript: <SiTypescript />, embedded: <MdDeveloperBoard />, "CI/CD": <MdSync />,
  AWS: <FaAws />, Kubernetes: <SiKubernetes />,
  "AI-assisted_development": <MdAutoAwesome />,
  unreal_engine: <SiUnrealengine />, Blender: <SiBlender />,
};
