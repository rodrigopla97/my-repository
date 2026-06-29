import AngularIcon from "./angularIcon";
import CssIcon from "./cssIcon";
import GitIcon from "./gitIcon";
import HtmltIcon from "./htmlIcon";
import JavascriptIcon from "./javascriptIcon";
import MongodbIcon from "./mongodbIcon";
import ReactIcon from "./reactIcon";
import TailwindIcon from "./tailwindIcon";
import TypescriptIcon from "./typescriptIcon";

export const ICON_MAP = {
  html: <HtmltIcon />,
  css: <CssIcon />,
  javascript: <JavascriptIcon />,
  angular: <AngularIcon />,
  react: <ReactIcon />,
  typescript: <TypescriptIcon />,
  tailwind: <TailwindIcon />,
  git: <GitIcon />,
  mongodb: <MongodbIcon />
} as const;

export type TechnologyKey = keyof typeof ICON_MAP;
