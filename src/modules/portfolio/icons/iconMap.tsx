import HtmltIcon from './htmlIcon';
import CssIcon from './cssIcon';
import JavascriptIcon from './javascriptIcon';
import AngularIcon from './angularIcon';
import ReactIcon from './reactIcon';
import TypescriptIcon from './typescriptIcon';
import TailwindIcon from './tailwindIcon';
import GitIcon from './gitIcon';
import MongodbIcon from './mongodbIcon';

export const ICON_MAP = {
  html: <HtmltIcon />,
  css: <CssIcon />,
  javascript: <JavascriptIcon />,
  angular: <AngularIcon />,
  react: <ReactIcon />,
  typescript: <TypescriptIcon />,
  tailwind: <TailwindIcon />,
  git: <GitIcon />,
  mongodb: <MongodbIcon />,
} as const;

export type TechnologyKey = keyof typeof ICON_MAP;
