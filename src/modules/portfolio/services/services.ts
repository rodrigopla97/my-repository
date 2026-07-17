import type {
  AboutContentType,
  ActionsTabdataItem
} from "@app/modules/portfolio/entities/entities";
import type { AxiosResponse } from "axios";
import axios from "axios";

export type TabApiItem = ActionsTabdataItem & { id: string; order?: string };

export async function getAboutContent(lang: "es" | "en"): Promise<AxiosResponse<AboutContentType>> {
  return await axios.get<AboutContentType>(`/portfolio/about/content?lang=${lang}`);
}

export async function getTabs(): Promise<AxiosResponse<TabApiItem[]>> {
  return await axios.get<TabApiItem[]>("/portfolio/home/tabs");
}
